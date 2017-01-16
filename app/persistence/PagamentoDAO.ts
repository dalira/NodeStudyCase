import * as mysql from "mysql";
import {Promise} from "es6-promise";
import {Pagamento} from "../models/Pagamento";
import {RowParser} from "../utils/query/RowParser";
import {QueryRestriction, QueryLimit, QueryOffset} from "../utils/query/QueryRestriction";
import {FieldRestriction, Limit, Offset, Restriction} from "../utils/restriction/Restriction";
import {QueryRestrictionParser} from "../utils/query/QueryRestrictionParser";

export class PagamentoDAO {

    private _connection: mysql.Connection;

    constructor(connection: mysql.Connection) {
        this._connection = connection;
    }

    insereERecupera(registro: Pagamento): Promise<Pagamento> {
        return new Promise((resolve: (registro: Pagamento) => void, reject: (error: Error) => void) => {

            this._connection.query<mysql.OkPacket>("insert into pagamento set ?",
                registro,
                (err, result) => {

                    if (err) return reject(err);

                    this.buscarPorId(result.insertId)
                        .then((comp: Pagamento) => resolve(comp))
                        .catch((err: Error) => reject(err));
                });
        });
    }

    buscarPorId(id: Number): Promise<Pagamento> {
        return new Promise((resolve: (registro: Pagamento) => void, reject: (error: Error) => void) => {
            this._connection.query<mysql.RowDataPacket[]>("select * from pagamento where id = ?", id, (err, result) => {
                if (err) reject(err);

                if (result.length == 0) {
                    resolve(null);
                }

                resolve(RowParser.parse<Pagamento>(result[0]));
            });
        });
    }

    buscar(...queryRestrictions: QueryRestriction[]): Promise<Pagamento[]> {
        return new Promise((resolve: (pagamentos: Pagamento[]) => void, reject: (error: Error) => void) => {

            let query: string = "select * from pagamento ";
            if (queryRestrictions && queryRestrictions.length) {
                let whereCommand: string = " where 1 = 1 ";

                let restrictionsSql: string = QueryRestrictionParser.parseToText(queryRestrictions);

                query = query.concat(whereCommand).concat(restrictionsSql);
            }

            this._connection.query<mysql.RowDataPacket[]>(query, (err, result) => {
                if (err) return reject(err);

                resolve(result.map((row) => RowParser.parse<Pagamento>(row)));
            });
        });
    }

    count(...queryRestrictions: QueryRestriction[]): Promise<number> {
        return new Promise((resolve: (count : number) => void, reject: (error: Error) => void) => {

            let query: string = "select count(1) count from pagamento ";
            if (queryRestrictions && queryRestrictions.length) {
                let whereCommand: string = " where 1 = 1 ";

                let restrictionsSql: string = QueryRestrictionParser.parseToText(queryRestrictions);

                query = query.concat(whereCommand).concat(restrictionsSql);
            }

            this._connection.query<mysql.RowDataPacket[]>(query, (err, result) => {
                if (err) return reject(err);

                resolve(result[0]['count']);
            });
        });
    }
}