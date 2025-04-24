import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { playerState } from "../../data/player";
import { FormatedLine, getLines, getOptions } from "../../three/utils/getInfo";
import { Options } from "../../types/scene";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import CharacterTextBox from "../characterTextBox/charactertextBox";
import UserSelectBox from "../userSelectBox/userSelectBox";
import "./style.css";

const Interaction: React.FC = () => {
  const characterTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<FormatedLine[]>([]);
  const [options, setOptions] = useState<Options[]>([]);
  const tl = useRef(gsap.timeline());
  const tlBack = useRef(
    gsap.timeline({
      onComplete: () => {
        if (playerState.currentDialog !== null && tl.current.progress() > 0.5) {
          eventEmitterInstance.trigger("openInteraction", [
            playerState.currentDialog,
          ]);
        }
      },
    }),
  );

  useGSAP(
    () => {
      tlBack.current.clear(true).timeScale(1);
      tl.current.clear(true).timeScale(1);
      lines.forEach((_line, index) => {
        tl.current
          .fromTo(
            "#character-text-box-" + index,
            {
              opacity: 0,
              y: "100%",
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
            },
            ">-0.5",
          )
          .fromTo(
            "#character-text-box-" + index + " .character_line-block",
            {
              opacity: 0,
              x: -100,
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              stagger: 0.5,
            },
            ">-0.75",
          );
        tlBack.current
          .to(
            "#character-text-box-" + index,
            {
              opacity: 0,
              y: "110%",
              duration: 1,
              ease: "expo.out",
            },
            "<",
          )
          .to(
            "#character-text-box-" + index + " .character_line-block",
            {
              opacity: 0,
              x: -110,
              duration: 1,
              stagger: 0,
            },
            "<",
          );
      });
      tl.current
        .fromTo(
          ".user-select-box_container",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: 0, duration: 0.5 },
          ">",
        )
        .fromTo(
          ".user-select-box_option",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.5,
          },
          ">",
        );
      tlBack.current
        .to(
          ".user-select-box_container",
          { opacity: 0, y: "110%", duration: 0.5 },
          "<",
        )
        .to(
          ".user-select-box_option",
          {
            opacity: 0,
            duration: 0.5,
            stagger: 0,
          },
          "<",
        );

      tl.current.progress(0);
      tlBack.current.progress(0);
      // tl.current.pause();
      tl.current.play();
      tlBack.current.pause();
    },
    { dependencies: [lines], scope: containerRef },
  );

  useEffect(() => {
    const handleInteractionOpen = () => {
      if (!playerState.currentScene || !playerState.currentDialog) return;
      console.log("handleInteractionOpen");

      const action = playerState.isInteracting
        ? playerState.currentDialog
          ? playerState.currentDialog
          : "start"
        : null;
      if (action === null) return;
      const lines = getLines(
        playerState.currentScene,
        playerState.currentDialog,
        action,
      );
      const options = getOptions(
        playerState.currentScene,
        playerState.currentDialog,
        action,
      );
      setLines(lines);
      setOptions(options ? options : []);
    };

    const handleGoto = (destination: string | null) => {
      tlBack.current.play();
      playerState.lastDialog = playerState.currentDialog;
      playerState.currentDialog = destination;
      if (destination === null) {
        playerState.isInteracting = false;
      }
    };
    eventEmitterInstance.on("openInteraction", handleInteractionOpen);
    eventEmitterInstance.on("goto", handleGoto);
    return () => {
      eventEmitterInstance.off("openInteraction");
      eventEmitterInstance.off("goto");
    };
  }, []);

  return (
    <div className="interaction" ref={containerRef}>
      <div className="interaction_perspective-container">
        <div
          className="interaction_character-text-container"
          ref={characterTextRef}
        >
          {lines.length > 0 &&
            lines.map((line, index) => (
              <CharacterTextBox
                line={line.line}
                name={line.name}
                key={index}
                characterIndex={index}
              />
            ))}
        </div>
      </div>
      {options.length > 0 && <UserSelectBox options={options} />}
    </div>
  );
};

export default Interaction;
