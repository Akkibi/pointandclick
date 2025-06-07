import ThreeScene from "./three/threeScene";
import UiElements from "./components/uiElements/uiElements";
import { useState } from "react";
import Intro from "./components/intro";
import IsLandscape from "./components/isLandscape/isLandscape";
import Menu from "./components/menu/menu";
import FloatingButton from "./components/floatingButton/floatingButton";

function App() {
    const [isIntroFinished, setIsIntroFinished] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    console.log("full reload");

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
        </>
    );
}

export default App;
