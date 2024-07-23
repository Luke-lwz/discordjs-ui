import { getContext } from "../context";

async function deferRender() {

    const { interaction } = getContext();
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