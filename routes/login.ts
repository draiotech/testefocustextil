import mongoose from "mongoose"
import { randomBytes } from "crypto"
import cliente from "./../models/cliente"

const bcrypt = require("bcrypt")

/*
 * Login para clientes.
 */
import express = require('express');

const router = express.Router();

//Interface para a requisição login de cliente
interface LoginRequest<T> extends express.Request { body: T }

router.post('/', async (req: LoginRequest<{
    email: string,
    password: string
}>, res: express.Response) => {
    try {
        //Procura pelo email do usuario
        const findByEmail = await cliente.findOne({ email: req.body.email }).exec();

        //Se não encontrar nenhum cliente com o email retorna erro
        if (!findByEmail)
            return res.status(400).json({ success: false, message: 'O cliente não foi encontrado.' });    

        //Valida a senha do cliente
        if (!bcrypt.compareSync(req.body.password, findByEmail.password))
            return res.status(400).json({ success: false, message: 'A senha é invalida' });    

        //Retorna sucesso, junto com o token e nome completo
        return res.status(200).json({ success: true, message: 'Cliente logado com sucesso!', fullname: findByEmail.fullname, token: findByEmail.token });
        
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
});

export default router;