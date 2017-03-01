import {QueryRestriction} from "./QueryRestriction";
import {Document, DocumentQuery} from "mongoose";
import {Equal} from "../../restriction/Equal";

export class QueryEqual<T extends Document> implements QueryRestriction<T> {

    private _restriction: Equal;

    constructor(restriction: Equal) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.where(this._restriction.field).equals(this._restriction.value);
    }

}
