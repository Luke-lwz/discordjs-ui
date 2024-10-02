import { getContext } from "./context";

interface ChannelPrefab {
  name: string;
  type: string;
  messages: any[];
  [key: string]: any;
}

export async function postChannelPrefab(prefab: ChannelPrefab) {
  const { name, type, messages, ...rest } = prefab;

  const { interaction, fileName, messageLayout } = getContext();

  let outChannel = null;
  let outMessages = [];

  try {
    const channel = await interaction.guild.channels.create(name, {
      type,
      ...rest,
    });
    outChannel = channel;
    for (const message of messages) {
      const msg = await channel.send(message);
        outMessages.push(msg);
    }
  } catch (e) {
    
  }

  return { channel: outChannel, messages: outMessages };
}
