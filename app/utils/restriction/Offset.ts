import {Restriction} from "./Restriction";

export class Offset extends Restriction<number> {

    constructor(value: number) {
        super(value);

        if (value < 1) {
            throw new Error("Valores válidos de paginas: > 0");
        }
    }

}
