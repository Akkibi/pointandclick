import { interfaceContent } from "../../data/interface";
import { playerState } from "../../data/player";
import { Options } from "../../types/scene";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import "./style.css";

const interaction = (option: Options) => {
    console.log("options", option);
    // add points to player
    if (option.points) {
        playerState.points.fool += option.points.fool ?? 0;
        playerState.points.freedom += option.points.freedom ?? 0;
        playerState.points.love += option.points.love ?? 0;
        playerState.points.truth += option.points.truth ?? 0;
    }
    if (option.customFunction) {
        const customFunction = option.customFunction;
        customFunction();
        console.log("play function");
    }
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
                        className="user-select-box_option clickable"
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
