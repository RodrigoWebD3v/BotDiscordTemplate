import { ChatInputCommandInteraction } from "discord.js";
import { commands } from "./comandos/commands";

export async function InteractionsExecute({
  interaction,
}: {
  interaction: ChatInputCommandInteraction;
}) {
  switch (interaction.commandName) {
    case "ping":
      await interaction.reply(
        `Pong! Latência: ${interaction.client.ws.ping}ms`
      );
      break;

    case "echo": {
      const mensagem = interaction.options.getString("mensagem", true);
      await interaction.reply(mensagem);
      break;
    }

    case "server":
      if (!interaction.guild) {
        await interaction.reply("Este comando só pode ser usado em servidores.");
        return;
      }
      await interaction.reply(
        `Servidor: ${interaction.guild.name}\nMembros: ${interaction.guild.memberCount}`
      );
      break;

    case "help": {
      const listaComandos = commands
        .map((cmd) => `/${cmd.name} - ${cmd.description}`)
        .join("\n");
      await interaction.reply(`Comandos disponíveis:\n${listaComandos}`);
      break;
    }

    default:
      await interaction.reply("Comando não reconhecido.");
  }
}
