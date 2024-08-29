import { UIRenderOptions } from "../../types";
import { getContext } from "../context";
import { filesDisallowedToUseRender } from "./constraints";



async function render(msg: any) {
  const { interaction, fileName } = getContext();

  if (filesDisallowedToUseRender.includes(fileName)) {
    throw new Error(
      `You are not allowed to use render(); in ${fileName}.`
    );
  }

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
