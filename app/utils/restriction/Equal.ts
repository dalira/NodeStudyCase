import {FieldRestriction} from "./FieldRestriction";

export class Equal extends FieldRestriction<any> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}
