import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
// import { getLines } from "./utils/getInfo";
import { playerState } from "../data/player";
import { eventEmitterInstance } from "../utils/eventEmitter";
import Game from "./game";

const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    // console.log(getLines("sceneff0000", "cataphile1", "start"));

    useEffect(() => {
        if (!mountRef.current) return;
        console.log(
            "mountRef",
            mountRef.current.children,
            mountRef.current.children[0] !== undefined,
        );
        if (mountRef.current.children.length > 0) return;

        // Scene
        // const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(
            13,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );

        const cameraGroup = new THREE.Group();
        camera.position.z = 50;
        cameraGroup.add(camera);
        // scene.add(cameraGroup);

        const game = new Game();
        mountRef.current.appendChild(game.renderer.domElement);

        // Handle window resize

        const handleResize = () => {
            eventEmitterInstance.trigger("resize", []);
        };

        eventEmitterInstance.trigger("resize", []);

        window.addEventListener("resize", handleResize);
        addEventListener("fullscreenchange", handleResize);

        const update = (_time: number, deltatime: number, tick: number) => {
            if (playerState.isMenuOpen) return;
            eventEmitterInstance.trigger("update", [tick, deltatime]);
            game.render();
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (playerState.isMenuOpen) return;
            playerState.mouse.target.x = event.clientX;
            playerState.mouse.target.y = event.clientY;
            eventEmitterInstance.trigger("mouseMove", [event]);
        };

        gsap.ticker.add(update);
        gsap.ticker.fps(30);

        const handleMouseDown = (event: MouseEvent) => {
            if (playerState.isMenuOpen) return;
            playerState.mouse.target.x = event.clientX;
            playerState.mouse.target.y = event.clientY;
            // if ((event.target as HTMLDivElement).id === "intro-game") {
            eventEmitterInstance.trigger("mouseDown", [event]);
            // }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            removeEventListener("fullscreenchange", handleResize);
            mountRef.current?.removeChild(game.renderer.domElement);
        };
    }, [mountRef]);

    return <div id="three-scene" ref={mountRef}></div>;
};

export default ThreeScene;
