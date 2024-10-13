import { getContext } from "../context";
import { mergeLayout } from "../messages";
import { filesDisallowedToUseRender } from "./constraints";
import render from "./render";

async function reply(msg: any) {
  const { interaction, fileName, messageLayout } = getContext();

  if (filesDisallowedToUseRender.includes(fileName)) {
    throw new Error(`You are not allowed to use reply(); in ${fileName}.`);
  }

  msg = mergeLayout(messageLayout, msg);

  if (interaction?.replied) {
    await interaction?.followUp?.(msg);
  } else {
    await interaction?.reply?.(msg);
  }
}

export default reply;
