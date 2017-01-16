import {Limit, Offset, Restriction, FieldRestriction} from "../restriction/Restriction";

export class RestQuery {
    private _restrictions : Restriction<any>[];
    private _limit: Limit;
    private _offset: Offset;

    constructor(restrictions: Restriction<any>[], limit: Limit, offset: Offset) {
        this._restrictions = restrictions;
        this._limit = limit;
        this._offset = offset;
    }

    get restrictions(): Restriction<any>[] {
        return this._restrictions;
    }

    get limit(): Limit {
        return this._limit;
    }

    get offset(): Offset {
        return this._offset;
    }
}