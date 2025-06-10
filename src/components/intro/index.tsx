import "./style.css";
import { useEffect, useRef, useState } from "react";

interface IntroType {
    setIsIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const videoSteps = [
    { video: "fenetre.webm", audio: "fenetre.wav" },
    { video: "road.mov", audio: "road.wav" },
    { video: "statue.webm", audio: "statue.wav" },
    { video: "leaf.webm", audio: "leaf.wav" },
    { video: "death.webm", audio: "death.wav" },
    { video: "metro.webm", audio: "metro.wav" },
    { video: "escalier.webm", audio: "escalier.wav" },
    { video: "fenetre.webm", audio: "fenetre.wav" },
    { video: "suicide.webm", audio: "suicide.wav" },
];

const Intro: React.FC<IntroType> = ({ setIsIntroFinished }) => {
    const [step, setStep] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const [withTransition, setWithTransition] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [showBlackScreen, setShowBlackScreen] = useState(true);
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
        if (step < videoSteps.length && !showBlackScreen) {
            const audio = new Audio(videoSteps[step].audio);
            audio.loop = false;
            audio.volume = 1;
            audioRefs.current[step] = audio;
            audio.play();
        }
    }, [step, showBlackScreen]);

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
        audioRefs.current.forEach((audio, idx) => {
            // Ne stoppe pas le dernier audio (suicide.wav)
            if (audio && idx !== 8) {
                const fadeDuration = 3000; // ms
                const fadeStep = 100; // ms
                let elapsed = 0;
                const startVolume = audio.volume;
                const fade = setInterval(() => {
                    elapsed += fadeStep;
                    // Ease out quadratique
                    const progress = Math.min(elapsed / fadeDuration, 1);
                    audio.volume = startVolume * (1 - progress) * (1 - progress);
                    if (progress >= 1) {
                        audio.volume = 0;
                        audio.pause();
                        audio.currentTime = 0;
                        clearInterval(fade);
                    }
                }, fadeStep);
            }
        });
    };

    useEffect(() => {
        if (step !== 8 || showBlackScreen) return;
        const video = suicideRef.current;
        if (!video) return;
        const handleEnded = () => {
            stopAllAudios();
            setIsIntroFinished(true);
        };
        video.addEventListener("ended", handleEnded);

        // Ajoute un timeout de 10s pour stopper tous les audios même si la vidéo ne se termine pas
        const timeout = setTimeout(() => {
            stopAllAudios();
        }, 12000);

        return () => {
            video.removeEventListener("ended", handleEnded);
            clearTimeout(timeout);
        };
    }, [step, setIsIntroFinished, showBlackScreen]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "$") {
            handleGoToGame();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, []);

    // Aussi sur le bouton "Go to game"
    const handleGoToGame = () => {
        setIsIntroFinished(true);
    };

    return (
        <div className="intro-container">
            {showBlackScreen ? (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "#000",
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: "2vw",
                        height: "100vh", // Ajouté pour centrer verticalement
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "4vw",
                            height: "fit-content",
                            maxWidth: 1200,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center", // centrer verticalement les colonnes
                        }}
                    >
                        <div
                            style={{
                                color: "#fff",
                                flex: 1,
                                fontSize: "1.5rem",
                                lineHeight: 2,
                                maxWidth: 700, // Limite la largeur du texte
                            }}
                        >
                            <b>Hello and bonjour from all of us at team Lutetia!</b>
                            <br /><br />
                            The way to Lutetia is an immersive virtual experience that invites you to explore the Paris Catacombs through a point and click narrative adventure.<br /><br />
                            This vertical slice is still in early development so there will surely be a few bugs but we thank you for taking the time to play through this demo and we hope you can imagine a bit of the full extent we would like to push this project!<br /><br />
                            We have a lot of big plans for future development and we are currently looking for ways to finance the next steps. If you are interested in being part of this journey with us or would like to get in contact for questions or more info a link to our dossier can be found <a
                                href="/dossier_thewaytoluetia.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#fff", textDecoration: "underline" }}
                            >
                                here
                            </a>:<br />
                            
                            <br />
                            And feel free to send us an email at <a href="mailto:souslutece@gmail.com" style={{ color: "#fff", textDecoration: "underline" }}>souslutece@gmail.com</a>
                            <br /><br />
                            For the best experience we suggest wearing headphones and turning off the lights!  <b>Just keep clicking to move forward</b> and we hope you enjoy!
                            <br /><br />
                            Sincerely,<br />
                            Team Lutetia
                        </div>
                    </div>
                    <button
                        className="clickable"
                        style={{
                            background: "#111",
                            color: "#fff",
                            border: "none",
                            padding: "1.2em 2.5em",
                            fontSize: "2rem",
                            borderRadius: "2em",
                            cursor: "pointer",
                            fontWeight: "bold",
                            letterSpacing: "0.1em",
                            marginTop: "8vh",
                        }}
                        onClick={() => setShowBlackScreen(false)}
                    >
                        Start
                    </button>
                </div>
            ) : (
                <>
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
                                    onClick={
                                        idx !== 8 ? () => handleVideoClick(idx + 1) : undefined
                                    }
                                    ref={idx === 8 ? suicideRef : undefined}
                                    style={{ cursor: idx !== 8 ? "pointer" : "default" }}
                                    onEnded={
                                        idx === 8
                                            ? () => {
                                                  stopAllAudios();
                                                  setIsIntroFinished(true);
                                              }
                                            : undefined
                                    }
                                />
                            </>
                        ) : null,
                    )}
                    <button
                        className="intro-button clickable"
                        onClick={() => {
                            stopAllAudios();
                            handleGoToGame();
                        }}
                    >
                        Skip Intro →
                    </button>
                </>
            )}
        </div>
    );
};

export default Intro;
