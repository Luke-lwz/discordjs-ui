

export interface UIRenderOptions {
  reply: boolean;
}

export function createUIRender(interaction: any) {
  async function render(msg: any, options: UIRenderOptions = { reply: false }) {
    // render UI
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

  async function deferRender() {
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

  return {render, deferRender};
}
