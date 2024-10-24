import { UIRenderOptions } from "../../types";
import { getContext } from "../context";
import { mergeLayout } from "../messages";
import { filesDisallowedToUseRender } from "./constraints";

async function render(msg: any) {
  const { interaction, fileName, messageLayout } = getContext();

  if (filesDisallowedToUseRender.includes(fileName)) {
    throw new Error(`You are not allowed to use render(); in ${fileName}.`);
  }


  msg = mergeLayout(messageLayout, msg);

  // render UI

  // add default message and then do a update not put (content : null, embeds: []) per default 🚨

  let outMessage = null;
  try {
    if (interaction?.deffered || interaction?.replied) {
      outMessage = await interaction?.editReply?.(msg);
    } else {
      if (interaction?.message) {
        outMessage = await interaction?.update?.(msg);
      } else {
        outMessage = await interaction?.reply?.(msg);
      }
    }
  } catch (e) {
    console.error(e);
  }

  return outMessage;
}

export default render;
