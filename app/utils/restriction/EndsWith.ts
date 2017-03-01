import {FieldRestriction} from "./FieldRestriction";

export class EndsWith extends FieldRestriction<String> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}