import { ModalBuilder as DiscordModalBuilder } from "discord.js";
import { NavigateOptions } from "../../types";

import { getContext } from "../context";
import { getNewPathNameWithSearchParams } from "../navigation";
import { encodeRoute } from "../routes";
import { ARGS_DIVIDER } from "../CONSTANTS";

class ModalBuilder extends DiscordModalBuilder {
  constructor() {
    super();
  }

  // Private method to set customId
  #setCustomId(customId: string): this {
    if (!this.setCustomId)
      throw new Error("Use only one of navigateTo or onClick methods.");
    this.setCustomId(customId);

    return this; // Ensure it returns 'this' for chaining
  }

  // Add the custom method to set customId with a path
  navigateTo(pathname: string, options?: NavigateOptions) {
    const { prefix } = getContext();
    // Assuming getNewPathNameWithSearchParams and encodeRoute are defined elsewhere
    pathname = getNewPathNameWithSearchParams(pathname, options?.searchParams);
    // Assuming 'prefix' is defined elsewhere
    this.#setCustomId(encodeRoute(pathname, prefix));
    this.setCustomId = null;
    return this;
  }

  onSubmit(fn: () => void, key: string) {
    const { prefix, buttonCache, currentPathname } = getContext();

    if (!key)
      throw new Error(
        "onSubmit requires 'key' as second argument, for memory management purposes. Two functions with the same key replace each other in memory."
      );
    // Assuming ARGS_DIVIDER, buttonCache, and currentPathname are defined elsewhere
    const prefixPlusTypeLength =
      prefix.length + `${ARGS_DIVIDER}f${ARGS_DIVIDER}`.length;
    const totalLength = prefixPlusTypeLength + key.length;
    if (totalLength > 100)
      throw new Error(`Key is too long (max: ${100 - prefixPlusTypeLength}).`);

    buttonCache.set(key, fn, currentPathname);
    this.#setCustomId(key);
    this.setCustomId = null;
    return this;
  }
}

export default ModalBuilder;
