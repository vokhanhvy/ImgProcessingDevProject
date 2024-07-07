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
exports.process = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const src = path_1.default.resolve('image');
const output = path_1.default.resolve('thumbnail');
const process = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const srcPath = path_1.default.join(src, filename);
    const outputPath = path_1.default.join(output, `${filename}-${width}x${height}.jpg`);
    if (!fs_1.default.existsSync(srcPath)) {
        return null;
    }
    if (fs_1.default.existsSync(outputPath)) {
        return outputPath;
    }
    try {
        yield (0, sharp_1.default)(srcPath)
            .resize(width, height)
            .toFormat('jpg')
            .toFile(outputPath);
        return outputPath;
    }
    catch (error) {
        console.error('error:', error);
        return null;
    }
});
exports.process = process;
