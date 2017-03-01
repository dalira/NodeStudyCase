import {Document, DocumentQuery} from "mongoose";
import {LowerThan} from "../../restriction/LowerThan";
import {QueryRestriction} from "./QueryRestriction";

export class QueryLowerThan<T extends Document> implements QueryRestriction<T> {

    private _restriction: LowerThan;

    constructor(restriction: LowerThan) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.lt(this._restriction.field, this._restriction.value.valueOf());
    }

}
