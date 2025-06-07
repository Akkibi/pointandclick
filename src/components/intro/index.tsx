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
                                fontSize: "1.1rem",
                                lineHeight: 1.6,
                                maxWidth: 500,
                            }}
                        >
                            <b>
                                L’équipe des cataphiles vous remercie de plonger avec nous dans la
                                première version de notre jeu !
                            </b>
                            <br />
                            Bienvenue dans Sous Lutèce, une expérience virtuelle immersive qui vous
                            invite à explorer les catacombes de Paris à travers un jeu
                            point-and-click.
                            <br />
                            <br />
                            <b>
                                Pour une expérience optimale, nous vous recommandons de jouer avec
                                le son, au casque ou avec des écouteurs.
                            </b>
                            <br />
                            Cliquez tout du long pour avancer !<br />
                            <br />
                            Merci de votre intérêt et bonne exploration !<br />
                            <br />
                            Si vous souhaitez nous contacter, voici nos informations :<br />
                            <a
                                href="mailto:contact@souslutece.com"
                                style={{ color: "#fff", textDecoration: "underline" }}
                            >
                                contact@souslutece.com
                            </a>
                            <br /> <br />
                            Vous souhaitez en savoir plus sur le projet ? Lisez notre dossier :{" "}
                            <br /> <br />
                            <a
                                href="/dossier_thewaytoluetia.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#fff", textDecoration: "underline" }}
                            >
                                J'accède au dossier !
                            </a>
                        </div>
                        <div
                            style={{
                                width: 2,
                                background: "rgba(255,255,255,0.25)",
                                margin: "0 2vw",
                                alignSelf: "center",
                                height: "50%",
                                flex: "none",
                            }}
                        />
                        <div
                            style={{
                                color: "#fff",
                                flex: 1,
                                fontSize: "1.1rem",
                                lineHeight: 1.6,
                                maxWidth: 500,
                            }}
                        >
                            <b>
                                Hello and bonjour from your resident Cataphiles! <br /> <br />
                                Thank you for diving into the first version of our game!
                            </b>
                            <br />
                            The way to Lutetia is an immersive virtual experience that invites you
                            to explore the Paris catacombs through a point-and-click narrative
                            adventure.
                            <br />
                            <br />
                            {/* Disillusioned with life on the surface, the player decides to disappear. They jump from a rooftop… and wake up deep inside the tunnels beneath the city.<br /><br />
As they move forward, they begin to discover the history of the catacombs, while also embarking on a more personal journey : the search for the Kingdom of Lutetia.<br /><br />
Their path, suspended between reality and fiction, is shaped by encounters with figures from Paris’s underground world.<br /><br /> */}
                            <b>
                                For the best experience, we recommend playing with sound, using
                                headphones or earphones.
                            </b>
                            <br />
                            Keep clicking to move forward !<br />
                            <br />
                            We have big plans to expand this project much much more and we are
                            currently looking into ways to fund and develop the next stage. For more
                            information{" "}
                            <a
                                href="/dossier_thewaytoluetia.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#fff", textDecoration: "underline" }}
                            >
                                here is a link to our dossier{" "}
                            </a>{" "}
                            and if you would like to get in touch feel free to send us an email at
                            <br />
                            <br />
                            <a
                                href="mailto:contact@souslutece.com"
                                style={{ color: "#fff", textDecoration: "underline" }}
                            >
                                contact@souslutece.com
                            </a>{" "}
                            <br /> <br />
                            If you'de like to know more about the project, you can also read our
                            dossier : <br /> <br />
                        </div>
                    </div>
                    <button
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
                        Commencer
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
                        className="intro-button"
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
