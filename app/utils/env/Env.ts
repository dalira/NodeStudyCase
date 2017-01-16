import * as url from "url";

class Env {

    private _APLICATION_BASE_PATH : url.Url;

    constructor() {
        this._APLICATION_BASE_PATH = url.parse(process.env.APLICATION_BASE_PATH);
    }

    get APLICATION_BASE_PATH(): url.Url {
        return this._APLICATION_BASE_PATH;
    }
}

const env : Env = new Env();

export default env;