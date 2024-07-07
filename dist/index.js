"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//let message: string = 'Hello World'
//console.log(message)
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use('/api/images', router_1.default);
app.listen(PORT, () => {
    console.log(`Server is start at port ${PORT}`);
});
exports.default = app;
