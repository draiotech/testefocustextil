import mongoose from "mongoose"
import { randomBytes } from "crypto"
import cliente from "./../models/cliente"

const bcrypt = require("bcrypt")

/*
 * Registra um cliente.
 */
import express = require('express');

const router = express.Router();

//Interface para a requisição de novo cliente
interface ClienteRequest<T> extends express.Request {body: T}

router.post('/', async (req: ClienteRequest<{
    fullname: string,
    email: string,
    password: string
}>, res: express.Response) => {
    try {

        //Verifica se o campo e-mail não está vazio
        if (!req.body.email || req.body.email == '') return res.status(400).json({ success: false, message: 'O campo e-mail é obrigatorio.' });  

        //Verifica se o campo password não está vazio
        if (!req.body.password || req.body.password == '') return res.status(400).json({ success: false, message: 'O campo senha é obrigatorio.' });  

        //Verifica se o campo fullname não está vazio
        if (!req.body.fullname || req.body.fullname == '') return res.status(400).json({ success: false, message: 'O campo nome completo é obrigatorio.' });  

        //Procura clientes com o mesmo e-mail
        const findByEmail = await cliente.find({ email: req.body.email }).exec()

        // Verificar se existe pelo menos um cliente com o e-mail e se sim retorna erro.
        if (findByEmail.length) return res.status(400).json({ success: false, message: 'Já existe um cadastro utilizando este e-mail.' });    

        //Cria um novo cliente
        const data = new cliente(req.body);

        //Gera um token para esse cliente
        data.token = randomBytes(64).toString('hex');

        //Criptografa a senha
        data.password = bcrypt.hashSync(data.password, 12);

        //Salva o cliente na database
        data.save();

        //Retorna sucesso, junto com o token
        return res.status(200).json({ success: true, message: 'Cliente cadastrado com sucesso!',token:data.token });
    }
    catch (error) {
        res.status(400).json({success:false, message: error.message })
    }   
});

export default router;