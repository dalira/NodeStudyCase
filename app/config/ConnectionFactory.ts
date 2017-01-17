import * as mongoose from "mongoose";
import {Connection} from "mongoose";

export class ConnectionFactory {

    private _connectionUrl: string;

    constructor(connectionUrl: string) {
        this._connectionUrl = connectionUrl;
    }

    public startConnection() : Connection {
        mongoose.connect(this._connectionUrl);
        let connection : Connection = mongoose.connection;

        connection.on("error", function (err) {
            console.error(`Algo de errado não esta certo com o Mongoose: ${err}`)
        });

        connection.once("open", function () {
            console.info("Motores do Mongoose ligados e prontos!");
        });

        return connection;
    }

}