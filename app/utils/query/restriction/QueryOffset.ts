import {Document, DocumentQuery} from "mongoose";
import {Limit} from "../../restriction/Limit";
import {Offset} from "../../restriction/Offset";
import {QueryRestriction} from "./QueryRestriction";

export class QueryOffset<T extends Document> implements QueryRestriction<T> {

    private _restriction: Offset;
    private _limit: Limit;

    constructor(restriction: Offset, limit: Limit) {
        this._restriction = restriction;
        this._limit = limit;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.skip((this._restriction.value - 1) * this._limit.value);
    }
}
