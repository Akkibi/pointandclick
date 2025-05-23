import { interfaceContent } from "../../data/interface";
import { Options } from "../../types/scene";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import "./style.css";

const interaction = (option: Options) => {
    eventEmitterInstance.trigger("goto", [option.destination]);
};

const UserSelectBox: React.FC<{ options: Options[] }> = ({ options }) => {
    const backgroundImage = interfaceContent.userSelectBox.backgroundImage;
    return (
        <div className="user-select-box_container">
            <div
                className="user-select-box"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: `center ${Math.random() > 0.5 ? "top" : "bottom"} ${Math.round(Math.random() * 10) * 2}rem`,
                }}
            >
                <h3 className="user-select-box_title">My response :</h3>
                {options.map((option: Options, index: number) => (
                    <button
                        className="user-select-box_option"
                        key={index}
                        onClick={(element) => {
                            interaction(option);
                            (element.target as HTMLButtonElement).blur();
                        }}
                    >
                        <p>{option.text}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserSelectBox;
