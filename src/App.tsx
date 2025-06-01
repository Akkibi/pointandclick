import ThreeScene from "./three/threeScene";
import UiElements from "./components/uiElements/uiElements";
import { useState } from "react";
import Intro from "./components/intro";
function App() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  console.log("full reload");


  return (
    <>
      {!isIntroFinished ? (
        <Intro setIsIntroFinished={setIsIntroFinished} />
      )
      : (
    <>
      <ThreeScene />
      <UiElements />
    </>
      )}
    </>
  );
}

export default App;
