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

export class QueryInterpreter {

    private constructor() {
    }

    static parse(restrictions: Restriction<any>[]): QueryRestriction[] {
        let queryRestrictions: QueryRestriction[] = [];

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

export interface QueryRestriction {

    toDataBaseRestriction(): string;

}

export class QueryEqual implements QueryRestriction {

    private _restriction: Equal;

    constructor(restriction: Equal) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} = '${this._restriction.value}'`;
    }

}

export class QueryStartsWith implements QueryRestriction {


    private _restriction: StartsWith;

    constructor(restriction: StartsWith) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} like '${this._restriction.value}%'`;
    }

}

export class QueryEndsWith implements QueryRestriction {


    private _restriction: EndsWith;

    constructor(restriction: EndsWith) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} like '%${this._restriction.value}'`;
    }

}

export class QueryLike implements QueryRestriction {


    private _restriction: Like;

    constructor(restriction: Like) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} like '%${this._restriction.value}%'`;
    }

}

export class QueryGreaterThan implements QueryRestriction {


    private _restriction: GreaterThan;

    constructor(restriction: GreaterThan) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} > ${this._restriction.value}`;
    }

}

export class QueryGreaterOrEqual implements QueryRestriction {


    private _restriction: GreaterOrEqual;

    constructor(restriction: GreaterOrEqual) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} >= ${this._restriction.value}`;
    }
}

export class QueryLowerThan implements QueryRestriction {


    private _restriction: LowerThan;

    constructor(restriction: LowerThan) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} < ${this._restriction.value}`;
    }

}

export class QueryLowerOrEqual implements QueryRestriction {


    private _restriction: LowerOrEqual;

    constructor(restriction: LowerOrEqual) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `and ${this._restriction.field} <= ${this._restriction.value}`;
    }
}

export class QueryLimit implements QueryRestriction {


    private _restriction: Limit;

    constructor(restriction: Limit) {
        this._restriction = restriction;
    }

    toDataBaseRestriction(): string {
        return `LIMIT ${this._restriction.value}`;
    }
}

export class QueryOffset implements QueryRestriction {

    private _restriction: Offset;
    private _limit: Limit;

    constructor(restriction: Offset, limit: Limit) {
        this._restriction = restriction;
        this._limit = limit;
    }

    toDataBaseRestriction(): string {
        if (this._restriction.value == 1) {
            return "";
        }
        return `OFFSET ${(this._restriction.value - 1) * this._limit.value}`;
    }
}