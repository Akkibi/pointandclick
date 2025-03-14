import "./style.css";
import { interfaceContent } from "../../data/interface";
import { Lines } from "../../types/scene";

interface CharacterTextBoxProps extends Lines {
  characterIndex: number;
}

const CharacterTextBox: React.FC<CharacterTextBoxProps> = ({
  line,
  name,
  characterIndex,
}) => {
  const index = Math.floor(
    Math.random() * interfaceContent.textboxBackgroundImages.length,
  );
  const backgroundImage = interfaceContent.textboxBackgroundImages[index];

  return (
    <div
      className="character-text-box_container"
      id={`character-text-box-${characterIndex}`}
    >
      <div className="character-text-box_username">
        <p>{name}</p>
      </div>
      <div className="character-text-box_message">
        <img
          src={backgroundImage}
          alt="background"
          className="character-text-box_message_background"
        />
        <p className="character-text-box_message_text">
          {line.map((line) => (
            <span key={line} className="character_line-block">
              {line}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default CharacterTextBox;
