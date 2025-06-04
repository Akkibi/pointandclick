import "./style.css";
import { useEffect, useRef, useState } from "react";

interface IntroType {
  setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
  // 0 = statue, 1 = metro, 2 = escalier, 3 = fenetre, 4 = suicide
  const [step, setStep] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [withTransition, setWithTransition] = useState(false);
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
    setWithTransition(false);      // Pas de transition pour cacher
    setTextVisible(false);

    const fadeInTimeout = setTimeout(() => {
      setWithTransition(true);     // Transition pour le fade-in
      setTextVisible(true);
    }, 2500);
// 2.5s pour le fade-in
    let fadeOutTimeout: ReturnType<typeof setTimeout> | undefined;
    if (step === words.length - 1) {
      fadeOutTimeout = setTimeout(() => {
        setTextVisible(false);     // Fade-out après 2s
      }, 2000);
    }
    // Cleanup function to clear timeouts

    return () => {
      clearTimeout(fadeInTimeout);
      if (fadeOutTimeout) clearTimeout(fadeOutTimeout);
    };
  }, [step, words.length]);

  const handleNextStep = (nextStep: number) => {
    setTextVisible(false); // Start fade out
    setTimeout(() => {
      setStep(nextStep); // Change step after fade out
    }, 20); // 200ms is enough for opacity to reach 0
  };

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
          textShadow: "0 0 8px #000, 0 0 16px #000",
          zIndex: 100000,
          pointerEvents: "none",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          opacity: textVisible ? 1 : 0,
          transition: withTransition ? "opacity 1.5s" : "none",
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
          onClick={() => handleNextStep(1)}
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
          onClick={() => handleNextStep(2)}
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
          onClick={() => handleNextStep(3)}
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
          onClick={() => handleNextStep(4)}
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
          onClick={() => handleNextStep(5)}
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
          onEnded={() => setIsIntroFinished(true)}
        />
      )}
    </div>
  );
};

export default Intro;
