"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roletaRussa = roletaRussa;
const service_1 = require("./service");
async function roletaRussa({ Cliente, Configs, }) {
    setInterval(async () => {
        const _config = (0, service_1.getConfigsService)({
            GUILDA_ID: Cliente.guilds.cache.first().id,
            GUILDA_NAME: Cliente.guilds.cache.first().name,
        });
        console.log("Executando roleta russa...");
        const guilds = Cliente.guilds.cache;
        const agora = new Date();
        const timestamp = agora.getTime();
        const { tempo_pausa, bot_parado } = await _config;
        if (timestamp >= tempo_pausa || bot_parado) {
            for (const [guildId, guild] of guilds) {
                try {
                    const fullGuild = await guild.fetch(); // busca dados atualizados
                    const channels = await fullGuild.channels.fetch();
                    const voiceChannels = channels.filter((c) => c?.isVoiceBased() && c.members?.size > 0);
                    const allMembers = Array.from(voiceChannels.values()).flatMap((channel) => Array.from(channel.members.values()));
                    if (allMembers.length === 0)
                        continue;
                    const randomMember = allMembers[Math.floor(Math.random() * allMembers.length)];
                    await randomMember.voice.disconnect();
                    const canal = await Cliente.channels.fetch("956322812807745556");
                    await canal.send(`${randomMember.user.displayName} foi desconectado!`);
                    console.log(`Desconectado aleatoriamente: ${randomMember.user.displayName}`);
                }
                catch (error) {
                    console.error(`Erro ao tentar desconectar membro em ${guild.name}:`, error);
                }
            }
        }
    }, Configs.interval);
}
