import { useEffect, useState } from "react";
import Menu from "../menu/menu";
import "./style.css";
import FloatingButton from "../floatingButton/floatingButton";
import Interaction from "../interaction/interaction";

const UiElements: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "You have attempted to leave this page. Are you sure?";
    }
  });

  return (
    <>
      <div className="ui">
        <FloatingButton onClick={() => setIsMenuOpen(true)} />
        <Interaction />
      </div>
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default UiElements;
