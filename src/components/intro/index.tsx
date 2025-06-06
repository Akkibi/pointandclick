import "./style.css";
import { useEffect, useRef, useState } from "react";

interface IntroType {
    setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const videoSteps = [
    { video: "fenetre.mov", audio: "fenetre.wav" },
    { video: "road.mov", audio: "road.wav" },
    { video: "statue.mov", audio: "statue.wav" },
    { video: "leaf.mov", audio: "leaf.wav" },
    { video: "death.mov", audio: "death.wav" },
    { video: "metro.mov", audio: "metro.wav" },
    { video: "escalier.mov", audio: "escalier.wav" },
    { video: "fenetre.mov", audio: "fenetre.wav" },
    { video: "suicide.mov", audio: "suicide.wav" },
];

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
    const [step, setStep] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const [withTransition, setWithTransition] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const suicideRef = useRef<HTMLVideoElement>(null);
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    const words = [
        "Have you ever stopped to ask yourself what it means to be alive?",
        "The sound of rain, the smell of grass...",
        "...now don't seem to matter anymore.",
        "Climate collapse, economic depression, fascism, war.",
        "It seems that everyday this world gets better at confining us to the corner of our rooms.",
        "But people don't seem to mind, they just continue on, their eyes glued to their screens",
        "I wonder what went wrong to make me so dissatisfied.",
        "Sometime I can't help but imagine, what it would feel like to just...",
        "...let go.",
    ];

    useEffect(() => {
        setClickCount(0);
        setWithTransition(false);
        setTextVisible(false);
    }, [step]);

    // Play audio for the current step, stacking all previous ones
    useEffect(() => {
        if (step < videoSteps.length) {
            // Create and play the audio for this step
            const audio = new Audio(videoSteps[step].audio);
            audio.loop = false;
            audio.volume = 1;
            audioRefs.current[step] = audio;
            audio.play();
        }
        // No cleanup: audios keep playing
        // eslint-disable-next-line
    }, [step]);

    useEffect(() => {
        if (step === 7) {
            setWithTransition(false);
            setTextVisible(false);
            const fadeInTimeout = setTimeout(() => {
                setWithTransition(true);
                setTextVisible(true);
            }, 3000);
            const fadeOutTimeout = setTimeout(() => {
                setWithTransition(true);
                setTextVisible(false);
            }, 7000);
            return () => {
                clearTimeout(fadeInTimeout);
                clearTimeout(fadeOutTimeout);
            };
        }
    }, [step]);

    useEffect(() => {
        if (step === 8) {
            setWithTransition(false);
            setTextVisible(false);
            const fadeInTimeout = setTimeout(() => {
                setWithTransition(true);
                setTextVisible(true);
            }, 4000);
            const fadeOutTimeout = setTimeout(() => {
                setWithTransition(true);
                setTextVisible(false);
            }, 8000);
            return () => {
                clearTimeout(fadeInTimeout);
                clearTimeout(fadeOutTimeout);
            };
        }
    }, [step]);

    const handleVideoClick = (nextStep: number) => {
        if (clickCount === 0) {
            setWithTransition(true);
            setTextVisible(true);
            setClickCount(1);
        } else {
            setWithTransition(false);
            setTextVisible(false);
            setTimeout(() => {
                setStep(nextStep);
            }, 50);
        }
    };

    // Stop all audios when intro is finished
    const stopAllAudios = () => {
        audioRefs.current.forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    };

    useEffect(() => {
        if (step !== 8) return;
        const video = suicideRef.current;
        if (!video) return;
        const handleEnded = () => {
            stopAllAudios();
            setIsIntroFinished(true);
        };
        video.addEventListener("ended", handleEnded);
        return () => {
            video.removeEventListener("ended", handleEnded);
        };
    }, [step, setIsIntroFinished]);

    // Aussi sur le bouton "Go to game"
    const handleGoToGame = () => {
        stopAllAudios();
        setIsIntroFinished(true);
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
            {videoSteps.map((item, idx) =>
                step === idx ? (
                    <>
                        <video
                            key={item.video + idx}
                            className="myvideo"
                            src={item.video}
                            autoPlay
                            loop={idx !== 8}
                            muted
                            preload="auto"
                            onClick={idx !== 8 ? () => handleVideoClick(idx + 1) : undefined}
                            ref={idx === 8 ? suicideRef : undefined}
                            style={{ cursor: idx !== 8 ? "pointer" : "default" }}
                            onEnded={idx === 8 ? () => {
                                stopAllAudios();
                                setIsIntroFinished(true);
                            } : undefined}
                        />
                        {/* Précharge la vidéo suivante si elle existe */}
                        {videoSteps[idx + 1] && (
                            <link
                                rel="preload"
                                as="video"
                                href={videoSteps[idx + 1].video}
                                key={"preload-" + videoSteps[idx + 1].video}
                            />
                        )}
                    </>
                ) : null
            )}
            <button className="intro-button" onClick={handleGoToGame}>Skip intro</button>
        </div>
    );
};

export default Intro;
