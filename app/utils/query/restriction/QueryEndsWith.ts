import {Document, DocumentQuery} from "mongoose";
import {EndsWith} from "../../restriction/EndsWith";
import {QueryRestriction} from "./QueryRestriction";

export class QueryEndsWith<T extends Document> implements QueryRestriction<T> {

    private _restriction: EndsWith;

    constructor(restriction: EndsWith) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.$where(`function() { return this.${this._restriction.field}.toString().match(/${this._restriction.value}$/) != null; }`);
    }

}
