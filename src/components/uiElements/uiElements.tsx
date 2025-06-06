import { useEffect, useState } from "react";
import Menu from "../menu/menu";
import "./style.css";
import FloatingButton from "../floatingButton/floatingButton";
import Interaction from "../interaction/interaction";
import IsLandscape from "../isLandscape/isLandscape";
import TestActionButton from "../testActionButton/testActionButton";
import TesingEnvironment from "../tesingEnvironment/tesingEnvironment";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import { playerState } from "../../data/player";

const UiElements: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showIntroAnimation, setShowIntroAnimation] = useState(true);
    const [introVideo, setIntroVideo] = useState("beginning");

    // useState(() => {
    //     console.log(introVideo);
    // }, [introVideo]);

    useEffect(() => {
        window.onbeforeunload = confirmExit;
        function confirmExit() {
            return "You have attempted to leave this page. Are you sure?";
        }

        const handleCloseIntro = () => {
            setIntroVideo("leave");
        };
        const handleIntroVideoState = (state: string) => {
            setIntroVideo(state);
        };

        eventEmitterInstance.on("custom-intro-video-state", handleIntroVideoState);
        eventEmitterInstance.on("custom-close-intro", handleCloseIntro);

        return () => {
            eventEmitterInstance.off("custom-close-intro");
        };
    }, []);

    return (
        <>
            <TesingEnvironment />
            <div className="ui">
                <FloatingButton onClick={() => setIsMenuOpen(true)} />
                <Interaction />
            </div>
            <div
                onClick={() => {
                    if (introVideo === "beginning") {
                        eventEmitterInstance.trigger("openInteraction");
                        console.log("open interraction");
                        playerState.isInteracting = true;
                        setIntroVideo("walk-up");
                    }
                }}
                id="intro-game"
                className={`intro-game ${showIntroAnimation ? "" : "hide-intro"}`}
            >
                {introVideo == "beginning" && (
                    <video
                        className="myvideo"
                        preload="auto"
                        autoPlay
                        src="./intro/beginning.webm"
                        loop
                    ></video>
                )}
                {introVideo == "walk-up" && (
                    <video
                        className="myvideo"
                        preload="auto"
                        autoPlay
                        src="./intro/walk-up.webm"
                        onEnded={() => {
                            setIntroVideo("dialogue");
                        }}
                    ></video>
                )}
                {introVideo == "dialogue" && (
                    <video
                        className="myvideo"
                        preload="auto"
                        autoPlay
                        src="./intro/dialogue.mp4"
                        loop
                    ></video>
                )}
                {introVideo == "leave" && (
                    <video
                        className="myvideo"
                        preload="auto"
                        autoPlay
                        src="./intro/leave.webm"
                        onEnded={() => {
                            playerState.cutScene = false;
                            setShowIntroAnimation(false);
                        }}
                    ></video>
                )}
            </div>
            <TestActionButton />
            <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <IsLandscape />
        </>
    );
};

export default UiElements;
