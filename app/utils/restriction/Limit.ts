import {Restriction} from "./Restriction";


export class Limit extends Restriction<number> {

    constructor(value: number) {
        super(value);
if (value < 1) {
            throw new Error("Valores válidos de registros por página: > 0");
        }
    }

}
