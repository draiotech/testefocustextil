"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connection_1 = require("./../connection");
/*
    Model Cliente
    - Estrutura do banco de dados representando os clientes
*/
exports.default = connection_1.default.get().model('Cliente', new mongoose_1.default.Schema({
    fullname: String,
    email: String,
    password: String,
    token: String
}));
//# sourceMappingURL=cliente.js.map