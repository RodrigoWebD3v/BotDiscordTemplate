import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { registerCommands } from "./comandos/commands";
import { InteractionsExecute } from "./interactions";

dotenv.config();

const _TOKEN = process.env.TOKEN?.trim();
const _CLIENT_ID = process.env.CLIENT_ID?.trim();
const envGuildIds = process.env.GUILD_IDS ?? process.env.GUILD_ID;
const _GUILD_IDS = envGuildIds
  ?.split(",")
  .map((id) => id.trim())
  .filter(Boolean);

if (!_TOKEN || !_CLIENT_ID) {
  throw new Error("Defina TOKEN e CLIENT_ID no arquivo .env.");
}

registerCommands({
  TOKEN: _TOKEN,
  CLIENT_ID: _CLIENT_ID,
  GUILD_IDS: _GUILD_IDS,
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot online como ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  InteractionsExecute({ interaction });
});

client.login(_TOKEN);
