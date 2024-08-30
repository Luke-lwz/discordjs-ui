import { getContext } from "../context";
import { mergeLayout } from "../messages";
import { filesDisallowedToUseRender } from "./constraints";

async function deferRender(msg: any) {
    const { interaction, fileName, messageLayout } = getContext();

    if (filesDisallowedToUseRender.includes(fileName)) {
      throw new Error(`You are not allowed to use deferRender(); in ${fileName}.`);
    }
  
  
    msg = mergeLayout(messageLayout, msg);

  try {
    if (interaction?.deffered || interaction?.replied) return;
    if (interaction?.message) {
      await interaction?.deferUpdate?.(msg);
    } else {
      await interaction?.deferReply?.(msg);
    }
  } catch (e) {
    console.error(e);
  }
}

export default deferRender;
