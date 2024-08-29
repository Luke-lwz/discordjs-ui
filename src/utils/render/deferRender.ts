import { getContext } from "../context";
import { filesDisallowedToUseRender } from "./constraints";

async function deferRender() {
  const { interaction, fileName } = getContext();

  if (filesDisallowedToUseRender.includes(fileName)) {
    throw new Error(
      `You are not allowed to use deferRender(); in ${fileName}.`
    );
  }

  try {
    if (interaction?.deffered || interaction?.replied) return;
    if (interaction?.message) {
      await interaction?.deferUpdate?.();
    } else {
      await interaction?.deferReply?.();
    }
  } catch (e) {
    console.error(e);
  }
}

export default deferRender;
