import { REST, Routes } from "discord.js";

// Exemplo de comandos padrão para o template
export const commands = [
  {
    name: "ping",
    description: "Responde com Pong! e a latência do bot.",
  },
  {
    name: "echo",
    description: "Repete a mensagem informada.",
    options: [
      {
        name: "mensagem",
        type: 3, // STRING
        description: "Mensagem para repetir",
        required: true,
      },
    ],
  },
  {
    name: "server",
    description: "Mostra informações básicas do servidor.",
  },
  {
    name: "help",
    description: "Mostra a lista de comandos disponíveis.",
  },
];

export async function registerCommands({
  TOKEN,
  CLIENT_ID,
  GUILD_IDS = [],
}: {
  TOKEN: string;
  CLIENT_ID: string;
  GUILD_IDS?: string[];
}) {
  const rest = new REST({ version: "10" }).setToken(TOKEN);

  try {
    console.log("Re-escrevendo comandos globais.");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    for (const guildId of GUILD_IDS) {
      try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
          body: commands,
        });
        console.log(`Comandos atualizados para a guilda ${guildId}.`);
      } catch (error) {
        console.error(
          `Falha ao registrar comandos na guilda ${guildId}. Verifique se o bot está na guilda e possui acesso.`
        );
        console.error(error);
      }
    }

    console.log("Sucesso ao reescrever comandos.");
  } catch (error) {
    console.error(error);
  }
}
