export abstract class Restriction<T> {
    private _value: T;

    constructor(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }
}

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

export class Equal extends FieldRestriction<any> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}

export class StartsWith extends FieldRestriction<String> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}

export class EndsWith extends FieldRestriction<String> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}

export class Like extends FieldRestriction<String> {

    constructor(field: string, value: any) {
        super(field, value);
    }

}

export class GreaterThan extends FieldRestriction<number | Date> {

    constructor(field: string, value: number | Date) {
        super(field, value);
    }

}

export class GreaterOrEqual extends FieldRestriction<number | Date> {

    constructor(field: string, value: number | Date) {
        super(field, value);
    }

}

export class LowerThan extends FieldRestriction<number | Date> {

    constructor(field: string, value: number | Date) {
        super(field, value);
    }

}

export class LowerOrEqual extends FieldRestriction<number | Date> {

    constructor(field: string, value: number | Date) {
        super(field, value);
    }

}

export class Limit extends Restriction<number> {

    constructor(value: number) {
        super(value);

        if (value < 1) {
            throw new Error("Valores válidos de registros por página: > 0");
        }
    }

}

export class Offset extends Restriction<number> {

    constructor(value: number) {
        super(value);

        if (value < 1) {
            throw new Error("Valores válidos de paginas: > 0");
        }
    }

}