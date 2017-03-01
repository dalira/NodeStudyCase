import {Document, DocumentQuery} from "mongoose";
import {GreaterThan} from "../../restriction/GreaterThan";
import {QueryRestriction} from "./QueryRestriction";

export class QueryGreaterThan<T extends Document> implements QueryRestriction<T> {

    private _restriction: GreaterThan;

    constructor(restriction: GreaterThan) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.gt(this._restriction.field, this._restriction.value.valueOf());
    }

}
