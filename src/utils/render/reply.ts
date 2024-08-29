import { getContext } from "../context";
import { filesDisallowedToUseRender } from "./constraints";
import render from "./render";

async function reply(msg: any) {
    const { interaction, fileName } = getContext();

    if (filesDisallowedToUseRender.includes(fileName)) {
      throw new Error(
        `You are not allowed to use reply(); in ${fileName}.`
      );
    }

  if (interaction?.replied) {
    await interaction?.followUp?.(msg);
  } else {
    await interaction?.reply?.(msg);
  }

}   

export default reply;
