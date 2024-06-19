import { Button, UIMessageCustomButton, UIMessageCustomSelectMenu } from "../types";


// make custom builder classes based on these types

export class UIButtonBuilder {
  private button: UIMessageCustomButton = {
    type: 2,
  };

  constructor() {}

  setCustomId(customId: string) {
    this.button.custom_id = customId;
    return this;
  }

  setLabel(label: string) {
    this.button.label = label;
    return this;
  }

  setStyle(style: number) {
    this.button.style = style;
    return this;
  }

  setEmoji(name: string, animated: boolean) {
    this.button.emoji = { name, animated };
    return this;
  }

  setUrl(url: string) {
    this.button.url = url;
    return this;
  }

  setDisabled(disabled: boolean) {
    this.button.disabled = disabled;
    return this;
  }


  // fancy functions
  onClick(fn: () => void) {
    this.button.onClick = fn;
    return this;
  }

  build() {

    const ERROR_SUFFIX = " (UIButtonBuilder)";


    const {custom_id: _custom_id, label, type, style } = this.button || {};

    if (!label) throw new Error("Label is required" + ERROR_SUFFIX);
    if (!style) throw new Error("Style is required" + ERROR_SUFFIX);


    const discordButton: Button = {
        custom_id: _custom_id,
        label,
        type,
        style,
    }
    return this.button;
  }
}