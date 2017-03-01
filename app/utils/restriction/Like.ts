import {FieldRestriction} from "./FieldRestriction";

export class Like extends FieldRestriction<String> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}
