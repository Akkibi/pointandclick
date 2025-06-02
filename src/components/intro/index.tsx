import "./style.css";
import { useEffect } from "react";

interface IntroType {
    setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {

  // edit component here @valentin
  useEffect(() => {
    const video = document.querySelector('.myvideo') as HTMLVideoElement;
    // Define the handler once so the same reference is used for add/remove
    const handleEnded = () => {
      setIsIntroFinished(true);
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [setIsIntroFinished]);

  return (
    <div className="intro-container">
      <h1>Intro</h1>
      <button className="intro-button" onClick={() => setIsIntroFinished(true)}>Go to game</button>
      {/* <video className="myvideo" src="https://valentinbleuse.com/videos/metamorphoses.mp4" autoPlay  /> */}
    </div>
  );
}

export default Intro;
