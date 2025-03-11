import { interfaceContent } from "../../data/interface";
import "./style.css";

interface UserSelectBoxProps {
  options: string[];
}

const UserSelectBox: React.FC<UserSelectBoxProps> = ({ options }) => {
  const backgroundImage = interfaceContent.userSelectBox.backgroundImage;

  return (
    <div className="user-select-box_container">
      <div
        className="user-select-box"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h3 className="user-select-box_title">Respond :</h3>
        {options.map((option) => (
          <button className="user-select-box_option" key={option}>
            <p>{option}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSelectBox;
