"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_setup_1 = require("../setup/firebase-setup");
const storage_1 = require("firebase/storage");
const api_error_1 = require("../exceptions/api-error");
class ImageController {
    upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    throw api_error_1.ApiError.BadRequest('no photo');
                }
                const storageRef = (0, storage_1.ref)(firebase_setup_1.storage, `files/${req.file.originalname}`);
                const metadata = {
                    contentType: req.file.mimetype
                };
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
                const downloadUrl = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                return res.send({
                    message: 'file uploaded to firebase storage',
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    downloadURL: downloadUrl
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new ImageController();
