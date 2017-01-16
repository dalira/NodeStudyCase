import {RowDataPacket} from "mysql";

export class RowParser {
    private constructor(){};

    static parse<T>(row: RowDataPacket) : T {
        let ret = {};
        for (let key in row) {
            ret[key] = row[key];
        }
        return ret as T;
    }
}
