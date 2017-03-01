import {FieldRestriction} from "./FieldRestriction";

export class LowerThan extends FieldRestriction<number | Date> {

    constructor(field: string, value: number | Date) {
        super(field, value);
    }

}
