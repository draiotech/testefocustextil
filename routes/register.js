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
const crypto_1 = require("crypto");
const cliente_1 = require("./../models/cliente");
const bcrypt = require("bcrypt");
/*
 * Registra um cliente.
 */
const express = require("express");
const router = express.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Procura clientes com o mesmo e-mail
        const findByEmail = yield cliente_1.default.find({ email: req.body.email }).exec();
        // Verificar se existe pelo menos um cliente com o e-mail e se sim retorna erro.
        if (findByEmail.length)
            return res.status(400).json({ success: false, message: 'J� existe um cadastro utilizando este e-mail.' });
        //Cria um novo cliente
        const data = new cliente_1.default(req.body);
        //Gera um token para esse cliente
        data.token = (0, crypto_1.randomBytes)(64).toString('hex');
        //Criptografa a senha
        data.password = bcrypt.hashSync(data.password, 12);
        //Salva o cliente na database
        data.save();
        //Retorna sucesso, junto com o token
        return res.status(200).json({ success: true, message: 'Cliente cadastrado com sucesso!', token: data.token });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=register.js.map