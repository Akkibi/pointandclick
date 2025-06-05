import "./style.css";

interface IntroType {
    setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
    // edit component here @valentin

    return (
        <div className="intro-container">
            <h1>Intro</h1>
            <button className="intro-button" onClick={() => setIsIntroFinished(true)}>
                Go to game
            </button>
        </div>
    );
};

export default Intro;
