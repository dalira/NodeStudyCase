import * as url from "url";

class Env {

    private _APLICATION_BASE_PATH : url.Url;
    private _AUTH_SECRET: string;

    constructor() {
        this._APLICATION_BASE_PATH = url.parse(process.env.APLICATION_BASE_PATH);
        this._AUTH_SECRET = process.env.AUTH_SECRET;
    }

    get APLICATION_BASE_PATH(): url.Url {
        return this._APLICATION_BASE_PATH;
    }

    get AUTH_SECRET(): string {
        return this._AUTH_SECRET;
    }
}

const env : Env = new Env();

export default env;