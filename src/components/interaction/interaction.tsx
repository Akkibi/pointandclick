import CharacterTextBox from "../characterTextBox/charactertextBox";
import UserSelectBox from "../userSelectBox/userSelectBox";
import "./style.css";

const Interaction: React.FC = () => {
  const talks = [
    {
      name: "bob",
      line: "Hello moi c'est bob",
    },
    {
      name: "bob",
      line: "MAIS QUI ÊTES-VOUS ? ou plutot que faites vous ici???",
    },
    {
      name: "Lorem ipsum le grand",
      line: "Lorem ipsum dolot sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas a a a a a a amet lorem ipsum dolor sit amet bla ",
    },
  ];

  return (
    <div className="interaction">
      <div className="interaction_character-text-container">
        {talks.map((talk, index) => (
          <CharacterTextBox
            playing={false}
            line={talk.line}
            name={talk.name}
            key={index}
          />
        ))}
      </div>
      <UserSelectBox
        options={[
          "bob",
          "bobby",
          "je sait pas j'ai pas compris la question, on peut même se demander si ...",
        ]}
      />
    </div>
  );
};

export default Interaction;
