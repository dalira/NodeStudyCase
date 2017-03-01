import {Restriction} from "../../restriction/Restriction";
import {Document, DocumentQuery} from "mongoose";
import {Equal} from "../../restriction/Equal";
import {EndsWith} from "../../restriction/EndsWith";
import {StartsWith} from "../../restriction/StartsWith";
import {Like} from "../../restriction/Like";
import {GreaterThan} from "../../restriction/GreaterThan";
import {GreaterOrEqual} from "../../restriction/GreaterOrEqual";
import {LowerThan} from "../../restriction/LowerThan";
import {LowerOrEqual} from "../../restriction/LowerOrEqual";
import {Limit} from "../../restriction/Limit";
import {Offset} from "../../restriction/Offset";
import {QueryRestriction} from "./QueryRestriction";

export class QueryLimit<T extends Document> implements QueryRestriction<T> {

    private _restriction: Limit;

    constructor(restriction: Limit) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.limit(this._restriction.value);
    }
}
