"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const commands_1 = require("./commands");
const interactions_1 = require("./interactions");
const roleta_russa_1 = require("./roleta_russa");
const repository_1 = require("./repository");
const service_1 = require("./service");
dotenv_1.default.config(); // Carrega as variáveis do .env para process.env
const _TOKEN = process.env.TOKEN;
const _CLIENT_ID = process.env.CLIENT_ID;
const _GUILD_ID = process.env.GUILD_ID;
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildVoiceStates],
});
(0, commands_1.registerCommands)({
    TOKEN: _TOKEN,
    CLIENT_ID: _CLIENT_ID,
    GUILD_ID: _GUILD_ID,
});
client.once("ready", async () => {
    console.log(`Bot online como ${client.user?.tag}`);
    const guild = client.guilds.cache.first();
    const configs = await (0, service_1.getConfigsService)({
        GUILDA_ID: guild.id,
        GUILDA_NAME: guild.name,
    });
    (0, roleta_russa_1.roletaRussa)({
        Cliente: client,
        Configs: configs,
    });
});
client.on(discord_js_1.Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    (0, interactions_1.InteractionsExecute)({ interaction });
});
const guild = client.guilds.cache.first();
if (guild) {
    if (!(0, repository_1.verificaCollectionExisteRepository)({
        GUILDA_ID: guild.id,
        GUILDA_NAME: guild.name,
    })) {
        (0, service_1.criarColecaoConfigGuildaService)({
            GUILDA_ID: guild.id,
            GUILDA_NAME: guild.name,
        });
    }
}
client.login(_TOKEN);
