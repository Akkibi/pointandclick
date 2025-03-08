import { global } from "../../global";
import { lerp } from "./lerp";

export const updateMouseSmooth = (amount: number) => {
  global.mouse.current.x = lerp(
    global.mouse.current.x,
    global.mouse.target.x,
    1 / amount,
  );
  global.mouse.current.y = lerp(
    global.mouse.current.y,
    global.mouse.target.y,
    1 / amount,
  );
};
