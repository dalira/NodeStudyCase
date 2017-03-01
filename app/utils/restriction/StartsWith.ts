import {FieldRestriction} from "./FieldRestriction";

export class StartsWith extends FieldRestriction<String> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}
