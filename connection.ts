import mongoose from "mongoose"

class Connection {

    private static db_connection: mongoose.Connection;

    static get(): mongoose.Connection {
        //Se já possui uma conexão retorna ela
        if (this.db_connection) return this.db_connection;

        //Carrega as configurações ambiente
        require('dotenv').config();

        //Conecta com o mongoDB e salav a conexão
        this.db_connection = mongoose.createConnection(process.env.MONGO_CONNECT);

        //Retorna a conexão recem criada
        return this.db_connection;
    }

}
export default Connection;