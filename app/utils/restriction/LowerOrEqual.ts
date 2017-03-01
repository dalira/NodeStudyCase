import {FieldRestriction} from "./FieldRestriction";

export class LowerOrEqual extends FieldRestriction<number | Date> {

    constructor(field: string, value: number | Date) {
        super(field, value);
    }

}
