import * as mysql from 'mysql';

export class ConnectionFactory {

    private constructor() {}

    public static createConnection() : mysql.Connection {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'payfast'
        });
    }

}