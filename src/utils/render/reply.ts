import { getContext } from "../context";
import render from "./render";

async function reply(msg: any) {
  const { interaction } = getContext();

  if (interaction?.replied) {
    await interaction?.followUp?.(msg);
  } else {
    await interaction?.reply?.(msg);
  }

}   

export default reply;
