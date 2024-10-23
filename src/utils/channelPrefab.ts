import { getContext } from "./context";

interface ChannelPrefab {
  name: string;
  type: string;
  guild: any;
  messages: any[];
  [key: string]: any;
}

export async function postChannelPrefab(prefab: ChannelPrefab) {
  const { name, type, messages, guild, ...rest } = prefab;

  if (!guild) {
    throw new Error("Missing guild in postChannelPrefab");
  }

  const { interaction, fileName, messageLayout } = getContext();

  let outChannel = null;
  let outMessages = [];

  try {
    const channel = await guild.channels.create({
      name,
      type,
      ...rest,
    });
    outChannel = channel;
    for (const message of messages) {
      const msg = await channel.send(message);
        outMessages.push(msg);
    }
  } catch (e) {
    console.log(e);
  }

  return { channel: outChannel, messages: outMessages };
}
