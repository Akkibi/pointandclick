import { useEffect, useState } from "react";
import { eventEmitterInstance } from "../../utils/eventEmitter"
import "./style.css"
import { playerState } from "../../data/player";

const openScene = () => {
  const sceneName = document.querySelector<HTMLInputElement>("#changeScene")?.value;
  console.log(sceneName);
  if (!sceneName) return;
  playerState.currentScene = sceneName;
  eventEmitterInstance.trigger("sceneChange")
}

const TesingEnvironment: React.FC = () => {

  const [testIsOpen, setTestIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "€") {
        setTestIsOpen(!testIsOpen);
        console.log("T pressed", testIsOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [testIsOpen])

  console.log("testIsOpen",testIsOpen);

  if (!testIsOpen) {
    return <></>;
  } else {
    return (
      <div className="tesing-environment">
        <h1>Tesing Environment</h1>
        <div className="texting-item-group">
          <label htmlFor="changeScene">Go to</label>
          <input type="text" name="changeScene" id="changeScene" />
          <button className="testing-btn" onClick={openScene}>Open scene</button>
        </div>
      </div>
    )
  }
}

export default TesingEnvironment
