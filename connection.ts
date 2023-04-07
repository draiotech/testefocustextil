import mongoose from "mongoose"

class Connection {

    private static db_connection: mongoose.Connection;

    static get(): mongoose.Connection {
        //Se j� possui uma conex�o retorna ela
        if (this.db_connection) return this.db_connection;

        //Carrega as configura��es ambiente
        require('dotenv').config();

        //Conecta com o mongoDB e salav a conex�o
        this.db_connection = mongoose.createConnection(process.env.MONGO_CONNECT);

        //Retorna a conex�o recem criada
        return this.db_connection;
    }

}
export default Connection;