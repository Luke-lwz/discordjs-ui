import { UIRenderOptions } from "../../types";
import { getContext } from "../context";

async function render(msg: any, options: UIRenderOptions = { reply: false }) {
  const { interaction } = getContext();

  const { reply } = options || {};
  // render UI

  // add default message and then do a update not put (content : null, embeds: []) per default 🚨

  try {
    if (reply) {
      if (interaction?.replied) {
        await interaction?.followUp?.(msg);
      } else {
        await interaction?.reply?.(msg);
      }
    } else {
      if (interaction?.deffered || interaction?.replied) {
        await interaction?.editReply?.(msg);
      } else {
        if (interaction?.message) {
          await interaction?.update?.(msg);
        } else {
          await interaction?.reply?.(msg);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export default render;
