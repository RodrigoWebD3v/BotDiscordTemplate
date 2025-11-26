"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaCollectionExisteService = verificaCollectionExisteService;
exports.criarColecaoConfigGuildaService = criarColecaoConfigGuildaService;
exports.getConfigsService = getConfigsService;
const repository_1 = require("./repository");
async function verificaCollectionExisteService({ GUILDA_ID, GUILDA_NAME, }) {
    const resultado = (0, repository_1.verificaCollectionExisteRepository)({
        GUILDA_ID,
        GUILDA_NAME,
    });
    return resultado;
}
async function criarColecaoConfigGuildaService({ GUILDA_ID, GUILDA_NAME, }) {
    const resultado = (0, repository_1.verificaCollectionExisteRepository)({
        GUILDA_ID,
        GUILDA_NAME,
    });
    if (!resultado) {
        await (0, repository_1.criarColecaoConfigGuildaRepository)({
            GUILDA_ID,
            GUILDA_NAME,
        });
    }
}
async function getConfigsService({ GUILDA_ID, GUILDA_NAME, }) {
    const configs = await (0, repository_1.getConfigsRepository)({
        GUILDA_ID,
        GUILDA_NAME,
    });
    const configObj = {
        interval: configs[0].interval,
        botName: configs[0].botName,
        bot_parado: configs[0].bot_parado,
        tempo_pausa: configs[0].tempo_pausa,
    };
    return configObj;
}
