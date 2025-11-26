"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaCollectionExisteRepository = verificaCollectionExisteRepository;
exports.criarColecaoConfigGuildaRepository = criarColecaoConfigGuildaRepository;
exports.getConfigsRepository = getConfigsRepository;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("./firebase");
const db = (0, firestore_1.getFirestore)(firebase_1.app);
async function verificaCollectionExisteRepository({ GUILDA_ID, GUILDA_NAME, }) {
    const ref = (0, firestore_1.collection)(db, `${GUILDA_NAME}_${GUILDA_ID}`);
    const snapshot = await (0, firestore_1.getDocs)(ref);
    return !snapshot.empty; // true se tem docs, false se está "vazia" (não criada)
}
async function criarColecaoConfigGuildaRepository({ GUILDA_ID, GUILDA_NAME, }) {
    const citiesCol = (0, firestore_1.collection)(db, `${GUILDA_NAME}_${GUILDA_ID}`);
    const docRef = await (0, firestore_1.addDoc)(citiesCol, {
        interval: 10000,
        botName: "RoletaBot",
        bot_parado: false,
        tempo_pausa: 0,
    });
}
async function getConfigsRepository({ GUILDA_ID, GUILDA_NAME, }) {
    const ref = (0, firestore_1.collection)(db, `${GUILDA_NAME}_${GUILDA_ID}`);
    const snapshotDocument = await (0, firestore_1.getDocs)(ref);
    return snapshotDocument.docs.map(doc => doc.data());
}
