import {
    Restriction,
    Equal,
    StartsWith,
    EndsWith,
    Like,
    GreaterThan,
    GreaterOrEqual,
    LowerThan,
    LowerOrEqual,
    Limit,
    Offset
} from "../restriction/Restriction";
import {Document, DocumentQuery} from "mongoose";

export class QueryInterpreter {

    private constructor() {
    }

    static parse<T extends Document>(restrictions: Restriction<any>[]): QueryRestriction<T>[] {
        let queryRestrictions: QueryRestriction<T>[] = [];

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

export interface QueryRestriction<T extends Document> {

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>);

}

export class QueryEqual<T extends Document> implements QueryRestriction<T> {

    private _restriction: Equal;

    constructor(restriction: Equal) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.where(this._restriction.field).equals(this._restriction.value);
    }

}

export class QueryStartsWith<T extends Document> implements QueryRestriction<T> {

    private _restriction: StartsWith;

    constructor(restriction: StartsWith) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.$where(`function() { return this.${this._restriction.field}.toString().match(/^${this._restriction.value}/) != null; }`);
    }

}

export class QueryEndsWith<T extends Document> implements QueryRestriction<T> {

    private _restriction: EndsWith;

    constructor(restriction: EndsWith) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.$where(`function() { return this.${this._restriction.field}.toString().match(/${this._restriction.value}$/) != null; }`);
    }

}

export class QueryLike<T extends Document> implements QueryRestriction<T> {

    private _restriction: Like;

    constructor(restriction: Like) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.$where(`function() { return this.${this._restriction.field}.toString().match(/${this._restriction.value}/) != null; }`);
    }

}

export class QueryGreaterThan<T extends Document> implements QueryRestriction<T> {

    private _restriction: GreaterThan;

    constructor(restriction: GreaterThan) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.gt(this._restriction.field, this._restriction.value.valueOf());
    }

}

export class QueryGreaterOrEqual<T extends Document> implements QueryRestriction<T> {

    private _restriction: GreaterOrEqual;

    constructor(restriction: GreaterOrEqual) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.gte(this._restriction.field, this._restriction.value.valueOf());
    }
}

export class QueryLowerThan<T extends Document> implements QueryRestriction<T> {

    private _restriction: LowerThan;

    constructor(restriction: LowerThan) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.lt(this._restriction.field, this._restriction.value.valueOf());
    }

}

export class QueryLowerOrEqual<T extends Document> implements QueryRestriction<T> {

    private _restriction: LowerOrEqual;

    constructor(restriction: LowerOrEqual) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.lte(this._restriction.field, this._restriction.value.valueOf());
    }
}

export class QueryLimit<T extends Document> implements QueryRestriction<T> {

    private _restriction: Limit;

    constructor(restriction: Limit) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(queryObject: DocumentQuery<T[], T>) {
        queryObject.limit(this._restriction.value);
    }
}

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