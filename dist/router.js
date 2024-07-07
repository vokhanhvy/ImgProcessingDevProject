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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = require("./imageProcessing");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    if (filename == null || width == null || height == null) {
        return res.status(400).json({ error: 'missing filename, width or height' });
    }
    try {
        const processedImageUrl = yield (0, imageProcessing_1.process)(filename, parseInt(width), parseInt(height));
        if (processedImageUrl) {
            res.sendFile(processedImageUrl);
        }
        else {
            res.status(500).json({ error: 'fail' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'error' });
    }
}));
exports.default = router;
