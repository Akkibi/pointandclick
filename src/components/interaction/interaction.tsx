import { useEffect, useRef, useState } from "react";
import CharacterTextBox from "../characterTextBox/charactertextBox";
import UserSelectBox from "../userSelectBox/userSelectBox";
import "./style.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import { Lines, Options } from "../../types/scene";
import { playerState } from "../../data/player";
import { scenes } from "../../data/scenes";

const Interaction: React.FC = () => {
  const characterTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Lines[]>([]);
  const [options, setOptions] = useState<Options[]>([]);
  const tl = useRef(
    gsap.timeline({
      onReverseComplete: () => {
        console.log("next dialog, ", playerState.currentDialog);
        if (playerState.currentDialog !== null) {
          console.log("trigger goto", playerState.currentDialog);
          eventEmitterInstance.trigger("openInteraction", [
            playerState.currentDialog,
          ]);
        }
      },
    }),
  );
  useGSAP(
    () => {
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
            },
            ">",
          )
          .fromTo(
            "#character-text-box-" + index + " .character_line-block",
            {
              opacity: 0,
              y: "100%",
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.5,
            },
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

      tl.current.progress(0);
      // tl.current.pause();
      tl.current.play();
    },
    { dependencies: [lines], scope: containerRef },
  );

  useEffect(() => {
    const handleInteractionOpen = () => {
      const currentScene: string = playerState.currentScene;
      const currentSceneData = scenes[currentScene];
      if (
        !currentSceneData.conversations ||
        !currentSceneData.conversations[0].dialog
      )
        return;

      const action = playerState.isInteracting
        ? playerState.currentDialog
          ? playerState.currentDialog
          : "start"
        : null;
      if (action === null) return;
      const lines = currentSceneData.conversations[0].dialog[action].lines;
      const options = currentSceneData.conversations[0].dialog[action].options;
      setLines(lines);
      setOptions(options ? options : []);
    };

    const handleGoto = (destination: string | null) => {
      tl.current.timeScale(3).reverse();
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
          {lines.length &&
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
      {options.length && <UserSelectBox options={options} />}
    </div>
  );
};

export default Interaction;
