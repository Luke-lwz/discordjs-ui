

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
        await interaction?.update?.(msg);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return render;
}
