"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.app = exports.firebaseConfig = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
exports.firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
exports.app = (0, app_1.initializeApp)(exports.firebaseConfig);
exports.storage = (0, storage_1.getStorage)();
