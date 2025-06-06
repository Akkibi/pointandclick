// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { gsap } from "gsap";
import useGSAP from "gsap";
gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <App />,
    //</StrictMode>
);
