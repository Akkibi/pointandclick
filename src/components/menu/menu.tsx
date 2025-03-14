import { useEffect, useRef } from "react";
import { global } from "../../global";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./style.css";
import FloatingButton from "../floatingButton/floatingButton";
import { eventEmitterInstance } from "../../utils/eventEmitter";
interface MenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const fullscreenHandler = () => {
  console.log(document.fullscreenElement);
  if (!document.fullscreenElement) {
    document.body.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  eventEmitterInstance.trigger("update-renderer");
};

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef(gsap.timeline());
  const backgroundBarRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLButtonElement>(null);
  const deleteRef = useRef<HTMLButtonElement>(null);
  const grayscaleRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (
        !buttonsContainerRef.current ||
        !saveRef.current ||
        !settingsRef.current ||
        !aboutRef.current ||
        !deleteRef.current ||
        !backgroundBarRef.current ||
        !grayscaleRef.current
      )
        return;
      tl.current = gsap
        .timeline({
          onReverseComplete: () => {
            setIsOpen(false);
          },
        })
        .from(buttonsContainerRef.current, {
          x: "-100%",
          ease: "expo.out",
          duration: 0.5,
        })
        .from(
          [
            saveRef.current,
            settingsRef.current,
            aboutRef.current,
            deleteRef.current,
          ],
          {
            x: "-100%",
            ease: "expo.out",
            duration: 0.5,
            stagger: 0.1,
          },
          "<",
        )
        .from(
          backgroundBarRef.current,
          {
            x: "-100%",
            ease: "expo.out",
            duration: 0.5,
          },
          "<",
        )
        .from(
          grayscaleRef.current,
          {
            opacity: 0,
            ease: "expo.out",
            duration: 0.5,
          },
          "<",
        );
      tl.current.progress(0);
      tl.current.pause();
    },
    { scope: container },
  );

  useEffect(() => {
    global.isMenuOpen = isOpen;
    if (isOpen) {
      tl.current.timeScale(1).play();
    }
  }, [isOpen]);

  return (
    <section
      ref={container}
      className="menu_container"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="menu">
        <div ref={grayscaleRef} className="menu_filter"></div>
        <div ref={backgroundBarRef} className="menu_background-left"></div>
        <FloatingButton
          onClick={() => tl.current.timeScale(2).reverse()}
          isClose
        />
        <div>
          <div className="menu_buttons" ref={buttonsContainerRef}>
            <h1 className="menu_title">Way To Lutetia</h1>
            <button ref={saveRef} className="menu_button-container">
              <div className="menu_button">
                <span>Save</span>
              </div>
            </button>
            <button
              ref={settingsRef}
              onClick={fullscreenHandler}
              className="menu_button-container"
            >
              <div className="menu_button">
                <span>Settings</span>
              </div>
            </button>
            <button ref={aboutRef} className="menu_button-container">
              <div className="menu_button">
                <span>About</span>
              </div>
            </button>
            <button ref={deleteRef} className="menu_button-container">
              <div className="menu_button">
                <span>Delete save</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
