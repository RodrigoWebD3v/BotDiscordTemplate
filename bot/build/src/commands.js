"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const discord_js_1 = require("discord.js");
const commands = [
    {
        name: 'stop',
        description: 'para o servico do bot indeterminadamente',
    },
    {
        name: 'start',
        description: 'inicia o servico do bot',
    },
    {
        name: 'status',
        description: 'mostra o status do bot',
    },
    {
        name: 'help',
        description: 'mostra os comandos disponiveis',
    },
    {
        name: 'restart',
        description: 'reinicia o bot para aplicar configuracoes',
    },
    {
        name: 'pause',
        description: 'defina em minutos o tempo que o bot ficara pausado',
        options: [
            {
                name: 'tempo',
                type: 10,
                description: 'tempo em minutos',
                required: true,
            },
        ],
    },
    {
        name: 'intervalo',
        description: 'altera o intervalo de tempo do bot',
        options: [
            {
                name: 'tempo',
                type: 10,
                description: 'tempo em minutos',
                required: true,
            },
        ],
    }
];
async function registerCommands({ TOKEN, CLIENT_ID, GUILD_ID }) {
    const rest = new discord_js_1.REST({ version: '10' }).setToken(TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(discord_js_1.Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        //await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}
