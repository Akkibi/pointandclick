import { playerState } from "../../data/player";
import { eventEmitterInstance } from "../../utils/eventEmitter";
import "./style.css";
const action = () => {
    console.log("testActionButton clicked");
    playerState.isInteracting = true;
    eventEmitterInstance.trigger("openInteraction");
};

const TestActionButton: React.FC = () => {
    return (
        <button className="testActionButton" onClick={action}>
            {">_"}
        </button>
    );
};

export default TestActionButton;
