import {Document, DocumentQuery} from "mongoose";
import {Like} from "../../restriction/Like";
import {QueryRestriction} from "./QueryRestriction";


export class QueryLike<T extends Document> implements QueryRestriction<T> {

    private _restriction: Like;

    constructor(restriction: Like) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.$where(`function() { return this.${this._restriction.field}.toString().match(/${this._restriction.value}/) != null; }`);
    }

}