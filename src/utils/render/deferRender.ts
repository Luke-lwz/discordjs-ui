import { getContext } from "../context";
import { mergeLayout } from "../messages";
import { filesDisallowedToUseRender } from "./constraints";

async function deferRender(msg: any) {
    const { interaction, fileName, messageLayout } = getContext();

    if (filesDisallowedToUseRender.includes(fileName)) {
      throw new Error(`You are not allowed to use deferRender(); in ${fileName}.`);
    }
  
  
    msg = mergeLayout(messageLayout, msg);

    let outMessage = null;

  try {
    if (interaction?.deffered || interaction?.replied) return;
    if (interaction?.message) {
      outMessage = await interaction?.deferUpdate?.(msg);
    } else {
      outMessage = await interaction?.deferReply?.(msg);
    }
  } catch (e) {
    console.error(e);
  }

  return outMessage;
}

export default deferRender;
