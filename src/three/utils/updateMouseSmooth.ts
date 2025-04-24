import { playerState } from "../../data/player";
import { lerp } from "./lerp";

export const updateMouseSmooth = (amount: number) => {
    playerState.mouse.current.x = lerp(
        playerState.mouse.current.x,
        playerState.mouse.target.x,
        1 / amount,
    );
    playerState.mouse.current.y = lerp(
        playerState.mouse.current.y,
        playerState.mouse.target.y,
        1 / amount,
    );
};
