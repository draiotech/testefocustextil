import mongoose from "mongoose"
import connection from "./../connection"

/*
    Model Cliente
    - Estrutura do banco de dados representando os clientes
*/

export default connection.get().model('Cliente', new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    token: String
}))