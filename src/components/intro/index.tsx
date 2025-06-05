import "./style.css";
import { useEffect, useRef, useState } from "react";

interface IntroType {
  setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
  const [step, setStep] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [withTransition, setWithTransition] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const suicideRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step !== 5) return;
    const video = suicideRef.current;
    if (!video) return;
    const handleEnded = () => setIsIntroFinished(true);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [step, setIsIntroFinished]);

  const words = [
    "Have you ever stopped to ask yourself what it means to be alive?",
    "The sound of rain, the smell of grass...",
    "...now don't seem to matter anymore.",
    "Sometime I can't help but imagine,",
    "what it would feel like to just...",
    "...let go.",
  ];

  useEffect(() => {
    setClickCount(0); // reset click count at each step
    setWithTransition(false);
    setTextVisible(false);
  }, [step]);

  const handleVideoClick = (nextStep: number) => {
    if (clickCount === 0) {
      setWithTransition(true);
      setTextVisible(true); // fade in text on first click
      setClickCount(1);
    } else {
      setWithTransition(false);
      setTextVisible(false); // hide text instantly
      setTimeout(() => {
        setStep(nextStep);
      }, 50); // let the opacity go to 0 before changing step
    }
  };

  useEffect(() => {
    if (step === 5) {
      setWithTransition(false);
      setTextVisible(false);
      // Fade in automatique
      const fadeInTimeout = setTimeout(() => {
        setWithTransition(true);
        setTextVisible(true);
      }, 3000);

      // Fade out automatique après 2s (mais ne termine pas l'intro ici)
      const fadeOutTimeout = setTimeout(() => {
        setWithTransition(true);
        setTextVisible(false);
        // NE PAS appeler setIsIntroFinished ici !
      }, 7000);

      return () => {
        clearTimeout(fadeInTimeout);
        clearTimeout(fadeOutTimeout);
      };
    }
  }, [step]);

  return (
    <div className="intro-container">
      <div
        key={step}
        style={{
          position: "fixed",
          bottom: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#fff",
          // textShadow: "0 0 8px #000, 0 0 16px #000",
          zIndex: 100000,
          pointerEvents: "none",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          opacity: textVisible ? 1 : 0,
          transition: withTransition ? "opacity 1s" : "none",
        }}
      >
        {words[step]}
      </div>
      {step === 0 && (
        <video
          className="myvideo"
          src="fenetre.mov"
          autoPlay
          loop
          muted
          preload="auto"
          onClick={() => handleVideoClick(1)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 1 && (
        <video
          className="myvideo"
          src="statue.mov"
          autoPlay
          loop
          muted
          preload="auto"
          onClick={() => handleVideoClick(2)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 2 && (
        <video
          className="myvideo"
          src="metro.mov"
          autoPlay
          loop
          muted
          preload="auto"
          onClick={() => handleVideoClick(3)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 3 && (
        <video
          className="myvideo"
          src="escalier.mov"
          autoPlay
          loop
          muted
          preload="auto"
          onClick={() => handleVideoClick(4)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 4 && (
        <video
          className="myvideo"
          src="fenetre.mov"
          autoPlay
          loop
          muted
          preload="auto"
          onClick={() => handleVideoClick(5)}
          style={{ cursor: "pointer" }}
        />
      )}
      {step === 5 && (
        <video
          className="myvideo"
          src="suicide.mov"
          ref={suicideRef}
          autoPlay
          muted
          preload="auto"
          style={{ cursor: "default" }}
          onEnded={() => setIsIntroFinished(true)}
        />
      )}
    </div>
  );
};

export default Intro;
