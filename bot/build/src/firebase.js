"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyA3i5Rz7zfUUCvRDE132jdAiwTiAAJEfAg",
    authDomain: "botroletarussa.firebaseapp.com",
    projectId: "botroletarussa",
    storageBucket: "botroletarussa.firebasestorage.app",
    messagingSenderId: "947194168584",
    appId: "1:947194168584:web:e5b51f5175436efe7018bd",
    measurementId: "G-MJTQKY0PJH"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
