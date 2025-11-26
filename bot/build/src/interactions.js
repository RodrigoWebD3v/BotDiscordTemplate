"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionsExecute = InteractionsExecute;
//import { alteraIntervaloTempo, iniciarBot, pararBot, pausarBot } from "./editar_configs";
async function InteractionsExecute({ interaction, }) {
    switch (interaction.commandName) {
        case "start":
            //iniciarBot();
            await interaction.reply("Bot iniciado com sucesso!");
            break;
        case "intervalo":
            const tempo = interaction.options.getNumber("tempo");
            if (tempo) {
                try {
                    // alteraIntervaloTempo({
                    //     Tempo: tempo
                    // });
                    await interaction.reply(`Intervalo alterado para ${tempo} minutos.`);
                }
                catch (error) {
                    console.error("Erro ao alterar intervalo:", error);
                    await interaction.reply("Erro ao alterar intervalo.");
                }
            }
            else {
                await interaction.reply("Por favor, forneça um valor válido.");
            }
            break;
        case "stop":
            //pararBot();
            await interaction.reply("Bot parado com sucesso!");
            break;
        case "help":
            await interaction.reply("Ainda não implementado");
            break;
        case "pause":
            const pause_tempo = interaction.options.getNumber("tempo");
            if (pause_tempo) {
                // pausarBot({
                //     Tempo: pause_tempo
                // })
            }
            await interaction.reply("Bot pausado temporariamente por " + pause_tempo + " minutos.");
            break;
        case "restart":
            await interaction.reply("Reiniciado o bot");
            break;
        default:
            await interaction.reply("Comando não reconhecido.");
    }
}
