import {Restriction} from "../../restriction/Restriction";
import {Document} from "mongoose";
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
import {QueryEqual} from "./QueryEqual";
import {QueryEndsWith} from "./QueryEndsWith";
import {QueryStartsWith} from "./QueryStartsWith";
import {QueryLike} from "./QueryLike";
import {QueryGreaterThan} from "./QueryGreaterThan";
import {QueryGreaterOrEqual} from "./QueryGreaterOrEqual";
import {QueryLowerThan} from "./QueryLowerThan";
import {QueryLowerOrEqual} from "./QueryLowerOrEqual";
import {QueryLimit} from "./QueryLimit";
import {QueryOffset} from "./QueryOffset";

export class QueryInterpreter {

    private constructor() {
    }

    static parse<T extends Document>(restrictions: Array<Restriction<any>>): Array<QueryRestriction<T>> {
        let queryRestrictions: Array<QueryRestriction<T>> = [];

        for (let i = 0; i < restrictions.length; i++) {
            let restriction: Restriction<any> = restrictions[i];

            if (restriction instanceof Equal) {
                queryRestrictions.push(new QueryEqual(restriction));
            } else if (restriction instanceof EndsWith) {
                queryRestrictions.push(new QueryEndsWith(restriction));
            } else if (restriction instanceof StartsWith) {
                queryRestrictions.push(new QueryStartsWith(restriction));
            } else if (restriction instanceof Like) {
                queryRestrictions.push(new QueryLike(restriction));
            } else if (restriction instanceof GreaterThan) {
                queryRestrictions.push(new QueryGreaterThan(restriction));
            } else if (restriction instanceof GreaterOrEqual) {
                queryRestrictions.push(new QueryGreaterOrEqual(restriction));
            } else if (restriction instanceof LowerThan) {
                queryRestrictions.push(new QueryLowerThan(restriction));
            } else if (restriction instanceof LowerOrEqual) {
                queryRestrictions.push(new QueryLowerOrEqual(restriction));
            } else if (restriction instanceof Limit) {
                queryRestrictions.push(new QueryLimit(restriction));
            } else if (restriction instanceof Offset) {

                let limit: Limit = restrictions.filter((r) => r instanceof Limit).pop();

                queryRestrictions.push(new QueryOffset(restriction, limit));
            }
        }

        return queryRestrictions;
    }
}