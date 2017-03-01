import {QueryRestriction} from "./restriction/QueryRestriction";
import {Document, DocumentQuery} from "mongoose";

export class QueryRestrictionParser<T extends Document> {

    private _query;

    constructor(query: DocumentQuery<T[], T>) {
        this._query = query;
    }

    parse<T extends Document>(queryRestrictions: QueryRestriction<T>[]) {
        queryRestrictions.forEach((restriction) => restriction.toDataBaseRestriction(this._query));
    }
}