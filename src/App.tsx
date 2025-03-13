import ThreeScene from "./three/threeScene";
import UiElements from "./components/uiElements/uiElements";
function App() {
  console.log("full reload");
  return (
    <>
      <ThreeScene />
      <UiElements />
    </>
  );
}

export default App;
