import ThreeScene from "./three/threeScene";
import UiElements from "./components/uiElements/uiElements";
import { useEffect, useState } from "react";
import Intro from "./components/intro";
import IsLandscape from "./components/isLandscape/isLandscape";
import Menu from "./components/menu/menu";
import FloatingButton from "./components/floatingButton/floatingButton";
import { preloadVideos, preloadAudios } from "./three/utils/ImagePreloader";

function App() {
    const [isIntroFinished, setIsIntroFinished] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    console.log("full reload");

    useEffect(() => {
        const videoUrls = [
            "./intro/beginning.webm",
            "./intro/walk-up.webm",
            "./intro/dialogue.mp4",
            "./intro/leave.webm",
            "./fenetre.webm",
            "./death.webm",
            "./metro.webm",
            "./escalier.webm",
            "./suicide.webm",
            "./leaf.webm",
            "./road.mov",
        ];

        const audioUrls = [
            "./fenetre.wav",
            "./road.wav",
            "./statue.wav",
            "./leaf.wav",
            "./death.wav",
            "./metro.wav",
            "./escalier.wav",
            "./suicide.wav",
        ];

        preloadVideos(videoUrls);
        preloadAudios(audioUrls);
    }, []);

    return (
        <>
            {!isIntroFinished ? (
                <Intro setIsIntroFinished={setIsIntroFinished} />
            ) : (
                <>
                    <ThreeScene />
                    <UiElements />
                </>
            )}
            <FloatingButton
                onClick={() => setIsMenuOpen(true)}
                style={{
                    top: 0,
                    left: 0,
                }}
            />
            <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <IsLandscape />
            {/* <div className="blue-tint"></div> */}
        </>
    );
}

export default App;
