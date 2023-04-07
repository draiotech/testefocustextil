"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Connection {
    static get() {
        //Se j� possui uma conex�o retorna ela
        if (this.db_connection)
            return this.db_connection;
        //Carrega as configura��es ambiente
        require('dotenv').config();
        //Conecta com o mongoDB e salav a conex�o
        this.db_connection = mongoose_1.default.createConnection(process.env.MONGO_CONNECT);
        //Retorna a conex�o recem criada
        return this.db_connection;
    }
}
exports.default = Connection;
//# sourceMappingURL=connection.js.map