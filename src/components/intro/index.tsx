import "./style.css";
import { useEffect, useRef, useState } from "react";

interface IntroType {
  setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
  // 0 = statue, 1 = metro, 2 = escalier, 3 = fenetre, 4 = suicide
  const [step, setStep] = useState(0);
  const suicideRef = useRef<HTMLVideoElement>(null);

  // Quand suicide.mov se termine, on termine l'intro
  useEffect(() => {
    if (step !== 4) return;
    const video = suicideRef.current;
    if (!video) return;
    const handleEnded = () => setIsIntroFinished(true);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [step, setIsIntroFinished]);

  return (
    <div className="intro-container">
      <h1>Intro</h1>
      {step === 0 && (
        <video
          className="myvideo"
          src="statue.mov"
          autoPlay
          loop
          muted
          onClick={() => setStep(1)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 1 && (
        <video
          className="myvideo"
          src="metro.mov"
          autoPlay
          loop
          muted
          onClick={() => setStep(2)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 2 && (
        <video
          className="myvideo"
          src="escalier.mov"
          autoPlay
          loop
          muted
          onClick={() => setStep(3)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 3 && (
        <video
          className="myvideo"
          src="fenetre.mov"
          autoPlay
          loop
          muted
          onClick={() => setStep(4)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 4 && (
        <video
          className="myvideo"
          src="suicide.mov"
          ref={suicideRef}
          autoPlay
        />
      )}
    </div>
  );
};

export default Intro;
