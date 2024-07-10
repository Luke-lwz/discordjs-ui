import { REST, Routes } from 'discord.js';

interface GetRegisterSlashCommandsFunctionProps {
clientId: string;
token: string;
guildId?: string;

} 


export class SlashCommandsRegisterFunction {
  private _clientId: string;
  private _token: string;
  private _guildId: string;

  constructor(props: GetRegisterSlashCommandsFunctionProps) {
    this._clientId = props.clientId;
    this._token = props.token;
    this._guildId = props.guildId;
  }

  public async registerSlashCommands(slashCommands: any[]) {
    const rest = new REST({ version: '9' }).setToken(this._token);

    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        this._guildId
          ? Routes.applicationGuildCommands(this._clientId, this._guildId)
          : Routes.applicationCommands(this._clientId),
        { body: slashCommands },
      );

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }
}