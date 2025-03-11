import "./style.css";
import { interfaceContent } from "../../data/interface";

interface CharacterTextBoxProps {
  text: string;
  name: string;
}

const CharacterTextBox: React.FC<CharacterTextBoxProps> = ({ text, name }) => {
  const index = Math.floor(
    Math.random() * interfaceContent.textboxBackgroundImages.length,
  );
  const backgroundImage = interfaceContent.textboxBackgroundImages[index];

  return (
    <div className="character-text-box_container">
      <div className="character-text-box_username">
        <p>{name}</p>
      </div>
      <div
        className="character-text-box_message"
        // style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <img
          src={backgroundImage}
          alt="background"
          className="character-text-box_message_background"
        />
        <p className="character-text-box_message_text">{text}</p>
      </div>
    </div>
  );
};

export default CharacterTextBox;
