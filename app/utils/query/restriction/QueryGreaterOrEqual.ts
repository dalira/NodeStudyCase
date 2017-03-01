import {QueryRestriction} from "./QueryRestriction";
import {Document, DocumentQuery} from "mongoose";
import {GreaterOrEqual} from "../../restriction/GreaterOrEqual";

export class QueryGreaterOrEqual<T extends Document> implements QueryRestriction<T> {

    private _restriction: GreaterOrEqual;

    constructor(restriction: GreaterOrEqual) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.gte(this._restriction.field, this._restriction.value.valueOf());
    }
}
