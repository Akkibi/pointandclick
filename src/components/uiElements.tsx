import { useState } from "react";
import Menu from "./menu";

const UiElements: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="ui">
        <button
          className="menu_icon-container"
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="menu_icon  menu_hide">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </button>
        <h1 className="ui-elements__title">Way to Lutetia</h1>
      </div>
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
};

export default UiElements;
