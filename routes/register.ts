import mongoose from "mongoose"
import { randomBytes } from "crypto"
import cliente from "./../models/cliente";

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

        //Procura clientes com o mesmo e-mail
        const findByEmail = await cliente.find({ email: req.body.email }).exec()

        // Verificar se existe pelo menos um cliente com o e-mail e se sim retorna erro.
        if (findByEmail.length) return res.status(400).json({ success: false, message: 'Já existe um cadastro utilizando este e-mail.' });    

        //Cria um novo cliente
        const data = new cliente(req.body);

        //Gera um token para esse cliente
        data.token = randomBytes(64).toString('hex');

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