import {Restriction} from "./Restriction";

export abstract class FieldRestriction<T> extends Restriction<T> {
    private _field: string;

    constructor(field: string, value: T) {
        super(value);
        this._field = field;
    }

    get field(): string {
        return this._field;
    }
}
