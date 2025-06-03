import "./style.css";
import { useEffect, useRef, useState } from "react";

interface IntroType {
  setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
  const [showMainVideo, setShowMainVideo] = useState(false);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = mainVideoRef.current;
    if (!showMainVideo || !video) return;

    const handleEnded = () => setIsIntroFinished(true);

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [setIsIntroFinished, showMainVideo]);

  const handleStart = () => {
    setShowMainVideo(true);
    setTimeout(() => {
      mainVideoRef.current?.play();
    }, 0);
  };

  return (
    <div className="intro-container">
      <h1>Intro</h1>
      {!showMainVideo && (
        <video
          className="loopvideo myvideo"
          src="fenetre.mov"
          autoPlay
          loop
          muted
          onClick={handleStart}
          style={{ cursor: "pointer" }}
        />
      )}
      {showMainVideo && (
        <video
          className="myvideo"
          src="suicide.mov"
          ref={mainVideoRef}
          autoPlay
        />
      )}
    </div>
  );
};

export default Intro;
