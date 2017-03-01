import {Document, DocumentQuery} from "mongoose";
import {LowerOrEqual} from "../../restriction/LowerOrEqual";
import {QueryRestriction} from "./QueryRestriction";

export class QueryLowerOrEqual<T extends Document> implements QueryRestriction<T> {

    private _restriction: LowerOrEqual;

    constructor(restriction: LowerOrEqual) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.lte(this._restriction.field, this._restriction.value.valueOf());
    }
}
