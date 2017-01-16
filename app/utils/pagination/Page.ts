export class Page<T> {

    private _body: T[];
    private _totalCount: number;
    private _offset: number;
    private _limit: number;

    hasPrevious(): boolean {
        let firstPage : boolean = this._offset == 1;
        let beforeLastPage : boolean = this.offset <= this.lastPage;
        return !firstPage && beforeLastPage;
    }

    hasNext(): boolean {
        let totalPages : number = Math.ceil(this._totalCount / this._limit);
        return this._offset < this.lastPage;
    }

    get lastPage() : number {
        return Math.ceil(this._totalCount / this._limit);
    }

    get body(): T[] {
        return this._body;
    }

    set body(value: T[]) {
        this._body = value;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    set totalCount(value: number) {
        this._totalCount = value;
    }

    get offset(): number {
        return this._offset;
    }

    set offset(value: number) {
        this._offset = value;
    }

    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }
}
