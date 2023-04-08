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
const cliente_1 = require("./../models/cliente");
const bcrypt = require("bcrypt");
/*
 * Login para clientes.
 */
const express = require("express");
const router = express.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Procura pelo email do usuario
        const findByEmail = yield cliente_1.default.findOne({ email: req.body.email }).exec();
        //Se n�o encontrar nenhum cliente com o email retorna erro
        if (!findByEmail)
            return res.status(400).json({ success: false, message: 'O cliente n�o foi encontrado.' });
        //Valida a senha do cliente
        if (!bcrypt.compareSync(req.body.password, findByEmail.password))
            return res.status(400).json({ success: false, message: 'A senha � invalida' });
        //Retorna sucesso, junto com o token e nome completo
        return res.status(200).json({ success: true, message: 'Cliente logado com sucesso!', fullname: findByEmail.fullname, token: findByEmail.token });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=login.js.map