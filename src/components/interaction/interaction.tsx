import CharacterTextBox from "../characterTextBox/charactertextBox";
import UserSelectBox from "../userSelectBox/userSelectBox";
import "./style.css";
const Interaction: React.FC = () => {
  return (
    <div className="interaction">
      <div className="interaction_character-text-container">
        <CharacterTextBox text="Hello moi c'est bob" name="bob" />
        <CharacterTextBox
          text="MAIS QUI ÊTES-VOUS ? ou plutot que faites vous ici???"
          name="bob"
        />
        <CharacterTextBox
          text="Lorem ipsum dolot sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas a a a a a a amet lorem ipsum dolor sit amet bla "
          name="Lorem ipsum le grand"
        />
      </div>
      <UserSelectBox
        options={[
          "bob (SAUF QUE C'EST AUSSI UNE RÉPONSE LONNNGUE mwahahaha)",
          "bobby",
          "je sait pas j'ai pas compris la question, on peut même se demander si il y avait vraiment une question en réalité ...",
        ]}
      />
    </div>
  );
};

export default Interaction;
