import { REST, Routes } from "discord.js";
import { SlashCommands } from "../types";

interface GetRegisterSlashCommandsFunctionProps {
  clientId: string;
  token: string;
  guildId?: string;
}

export function createRegisterSlashCommandsFunction(
  props: GetRegisterSlashCommandsFunctionProps
) {
  const { clientId, token, guildId } = props;

  // Inline class logic or use an instance of the class
  const registerSlashCommands = async (slashCommands: SlashCommands[]) => {
    const rest = new REST().setToken(token);

    try {
      console.log("Started refreshing application (/) commands.");

      const slashCommandsJson = slashCommands?.map((command) => command?.command?.toJSON())?.filter(c => c) ||[]

      await rest.put(
        guildId
          ? Routes.applicationGuildCommands(clientId, guildId)
          : Routes.applicationCommands(clientId),
        { body: slashCommandsJson }
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };

  return registerSlashCommands;
}
