import { useRef } from "react";
import { global } from "../global";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

  useGSAP(() => {
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
        <button
          className="menu_icon-container"
          onClick={() => tl.current.timeScale(2).reverse()}
        >
          <div className="menu_icon">
            <svg
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 21.32L21 3.32001"
                stroke="currentColor"
                stroke-width="1.5"
              ></path>
              <path
                d="M3 3.32001L21 21.32"
                stroke="currentColor"
                stroke-width="1.5"
              ></path>
            </svg>
          </div>
        </button>
        <div>
          <div className="menu_buttons" ref={buttonsContainerRef}>
            <h1 className="menu_title">Menu</h1>
            <button ref={saveRef} className="menu_button">
              <span>Save</span>
            </button>
            <button ref={settingsRef} className="menu_button">
              <span>Settings</span>
            </button>
            <button ref={aboutRef} className="menu_button">
              <span>About</span>
            </button>
            <button ref={deleteRef} className="menu_button">
              <span>Delete save</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
