import { useEffect, useState } from "react";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import "./style.css";
import { playerState } from "../../data/player";
import { getScene } from "../../three/utils/getInfo";

const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sceneName = event.target.value;
    const sceneData = getScene(sceneName);
    let conversation = null;
    if (sceneData) {
        conversation = sceneData.conversations;
    }
    const goto = document.querySelector<HTMLSpanElement>("#goto");
    const name = document.querySelector<HTMLSpanElement>("#name");
    if (name && conversation && conversation.length > 0) {
        const nameText = conversation[0].characters[0].name;
        name.innerHTML = nameText;
    }
    if (goto) goto.innerHTML = sceneName;
};

const TesingEnvironment: React.FC = () => {
    const [testIsOpen, setTestIsOpen] = useState(false);

    const openScene = () => {
        const sceneName = document.querySelector<HTMLInputElement>("#changeScene")?.value;
        console.log(sceneName);
        if (!sceneName) return;
        playerState.currentScene = sceneName;
        eventEmitterInstance.trigger("sceneChange");
        setTestIsOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "$") {
                event.preventDefault();
                setTestIsOpen(!testIsOpen);
                const changeSceneItem = document.querySelector<HTMLInputElement>("#changeScene");
                console.log(changeSceneItem);
                if (!changeSceneItem) return;
                changeSceneItem.value = "";
            }
            if (event.key === "Enter") {
                openScene();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [testIsOpen]);

    console.log("testIsOpen", testIsOpen);
    if (!testIsOpen) return <></>;
    return (
        <div className="tesing-environment">
            <h1>Testing Environment - {playerState.currentScene} </h1>
            <div className="texting-item-group">
                <input
                    type="text"
                    name="changeScene"
                    onChange={handleOnchange}
                    id="changeScene"
                    autoFocus
                />
                <p>
                    Go to: <span id="goto"></span>
                </p>
                <p>
                    There is: <span id="name"></span> there
                </p>
                <div className="testing-grid">
                    <button
                        className="testing-btn"
                        onClick={() => {
                            playerState.currentScene = "artist";
                            playerState.isLookingFront = false;
                            eventEmitterInstance.trigger("sceneChange");
                            setTestIsOpen(false);
                        }}
                    >
                        Go to Artist
                    </button>
                    <button
                        className="testing-btn"
                        onClick={() => {
                            playerState.currentScene = "scene9";
                            playerState.isLookingFront = true;
                            eventEmitterInstance.trigger("sceneChange");
                            setTestIsOpen(false);
                        }}
                    >
                        Go to Painting
                    </button>
                    <button
                        className="testing-btn"
                        onClick={() => {
                            playerState.currentScene = "scene1";
                            playerState.isLookingFront = true;
                            eventEmitterInstance.trigger("sceneChange");
                            setTestIsOpen(false);
                        }}
                    >
                        Go to Capathile
                    </button>
                    <button
                        className="testing-btn"
                        onClick={() => {
                            playerState.currentScene = "scene13";
                            playerState.isLookingFront = true;
                            eventEmitterInstance.trigger("sceneChange");
                            setTestIsOpen(false);
                        }}
                    >
                        Go to StoneWorker
                    </button>
                    <button
                        className="testing-btn"
                        onClick={() => {
                            playerState.currentScene = "scene16";
                            eventEmitterInstance.trigger("sceneChange");
                            setTestIsOpen(false);
                        }}
                    >
                        Go to Throne
                    </button>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2vh",
                    width: "50vmin",
                }}
            >
                <p className="texting-item-group">
                    <span>Love : {playerState.points.love}</span>
                    <span>Fool : {playerState.points.fool}</span>
                    <span>Truth : {playerState.points.truth}</span>
                    <span>Freedom : {playerState.points.freedom}</span>
                </p>
                <p className="texting-item-group">
                    <span>
                        CurrentScene :<h3>{playerState.currentScene}</h3>
                    </span>
                    <span>
                        CurrentConversation :<h3>{playerState.currentConversation}</h3>
                    </span>
                    <span>
                        CurrentDialog :<h3>{playerState.currentDialog}</h3>
                    </span>
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2vh",
                    width: "50vmin",
                }}
            >
                <p className="texting-item-group">
                    <h3>ACHIEVEMENTS</h3>
                    {playerState.achievements.map((achievement, index) => (
                        <span key={index}>{achievement}</span>
                    ))}
                </p>
                <p className="texting-item-group">
                    <h3>OBJECTS</h3>
                    {playerState.objects.map((object, index) => (
                        <span key={index}>{object}</span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default TesingEnvironment;
