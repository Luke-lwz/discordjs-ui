import { UIRenderOptions } from "../../types";
import { getContext } from "../context";

async function render(msg: any) {
  const { interaction } = getContext();

  // render UI

  // add default message and then do a update not put (content : null, embeds: []) per default 🚨

  try {
      if (interaction?.deffered || interaction?.replied) {
        await interaction?.editReply?.(msg);
      } else {
        if (interaction?.message) {
          await interaction?.update?.(msg);
        } else {
          await interaction?.reply?.(msg);
        }
      }
    
  } catch (e) {
    console.error(e);
  }
}

export default render;
