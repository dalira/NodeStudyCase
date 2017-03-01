import {Document, DocumentQuery} from "mongoose";
import {StartsWith} from "../../restriction/StartsWith";
import {QueryRestriction} from "./QueryRestriction";

export class QueryStartsWith<T extends Document> implements QueryRestriction<T> {

    private _restriction: StartsWith;

    constructor(restriction: StartsWith) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.$where(`function() { return this.${this._restriction.field}.toString().match(/^${this._restriction.value}/) != null; }`);
    }

}
