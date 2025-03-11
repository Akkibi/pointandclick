import CharacterTextBox from "../characterTextBox/charactertextBox";
import UserSelectBox from "../userSelectBox/userSelectBox";
import "./style.css";
const Interaction: React.FC = () => {
  return (
    <div className="interaction">
      <CharacterTextBox text="Hello" name="bob" />
      <CharacterTextBox text="MAIS QUI Etes-vous ?" name="bob" />
      <CharacterTextBox
        text="Lorem ipsum dolot sit amet lorem ipsum dolor sit amet"
        name="Lorem ipsum le grand"
      />
      <UserSelectBox options={["bob", "bobby", "bobbins"]} />
    </div>
  );
};

export default Interaction;
