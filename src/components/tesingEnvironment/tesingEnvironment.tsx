import { useEffect, useState } from "react";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import "./style.css";
import { playerState } from "../../data/player";
import { getScene } from "../../three/utils/getInfo";

const openScene = () => {
    const sceneName = document.querySelector<HTMLInputElement>("#changeScene")?.value;
    console.log(sceneName);
    if (!sceneName) return;
    playerState.currentScene = sceneName;
    eventEmitterInstance.trigger("sceneChange");
};

const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sceneName = event.target.value;
    console.log(getScene(sceneName).conversations);
};

const TesingEnvironment: React.FC = () => {
    const [testIsOpen, setTestIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "$") {
                setTestIsOpen(!testIsOpen);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [testIsOpen]);

    console.log("testIsOpen", testIsOpen);

    if (!testIsOpen) {
        return <></>;
    } else {
        return (
            <div className="tesing-environment">
                <h1>Testing Environment - {playerState.currentScene} </h1>
                <div className="texting-item-group">
                    <label htmlFor="changeScene">Go to</label>
                    <input
                        type="text"
                        name="changeScene"
                        onChange={handleOnchange}
                        id="changeScene"
                    />
                    <button className="testing-btn" onClick={openScene}>
                        Open scene
                    </button>
                </div>
            </div>
        );
    }
};

export default TesingEnvironment;
