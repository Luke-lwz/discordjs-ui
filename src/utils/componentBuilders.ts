import { ButtonBuilder } from "discord.js";
import {
  Button,
  NavigateOptions,
  UIMessageCustomButton,
  UIMessageCustomSelectMenu,
} from "../types";
import { encodeRoute } from "./routes";
import { ARGS_DIVIDER } from "./CONSTANTS";
import { getNewPathNameWithSearchParams } from "./navigation";

const ERROR_SUFFIX = " (UIButtonBuilder)";


// make custom builder classes based on these types

export function getBuilders(prefix: string, buttonCache: any, currentPathname: string) {
  class UIButtonBuilder {
    button: UIMessageCustomButton = {
      type: 2,
      style: 1,
      label: "",
      disabled: false,
      emoji: null,
      url: null,
      custom_id: null,
      onClick: null,
      navigateTo: null,
    };

    onClickKey = null;

    constructor() {}

    setLabel(label: string) {
      this.button.label = label;
      return this;
    }

    setStyle(style: number) {
      this.button.style = style;
      return this;
    }

    setEmoji(emoji: string) {
      this.button.emoji = emoji;
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
    onClick(fn: () => void, key: string) {
      if (!key) throw new Error("onClick requires 'key' as second argument, for memory management purposes. Two functions with the same key replace each other in memory" + ERROR_SUFFIX);
      // ui>f>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
      const prefixPlusTypeLength = prefix.length + (`${ARGS_DIVIDER}f${ARGS_DIVIDER}`).length;
      const totalLength = prefixPlusTypeLength + key.length;
      if (totalLength > 100) throw new Error(`Key is too long (max: ${100 - prefixPlusTypeLength})` + ERROR_SUFFIX);
      this.button.onClick = fn;
      this.onClickKey = key;
      return this;
    }

    navigateTo(pathname: string, options?: NavigateOptions) {
      pathname = getNewPathNameWithSearchParams(pathname, options?.searchParams);
      this.button.navigateTo = encodeURI(pathname);
      return this;
    }

    setCustomId(customId: string) {
      this.button.custom_id = customId;
      return this;
    }

    build() {

      const {
        custom_id: _custom_id,
        label,
        style,
        emoji,
        disabled,
        navigateTo,
        onClick,
        url,
      } = (this.button as UIMessageCustomButton) || {};

      if (!label) throw new Error("Label is required" + ERROR_SUFFIX);
      if (!style) throw new Error("Style is required" + ERROR_SUFFIX);

      let btn = new ButtonBuilder();
      if (emoji) btn.setEmoji(emoji);
      if (style) btn.setStyle(style);
      if (label) btn.setLabel(label);
      if (url) btn.setURL(url);
      if (disabled) btn.setDisabled(disabled);

      let custom_id = _custom_id;

      if (onClick) {
        let key: string = this.onClickKey
        buttonCache.set(key, onClick, currentPathname);
      } else if (navigateTo) {
        custom_id = encodeRoute(navigateTo, prefix);
      }

      btn.setCustomId(custom_id);

      return btn;
    }
  }

  return {
    UIButtonBuilder,
    // UISelectMenuBuilder,
  };
}
