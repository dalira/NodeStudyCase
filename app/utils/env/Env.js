"use strict";
var url = require("url");
var Env = (function () {
    function Env() {
        this._APLICATION_BASE_PATH = url.parse(process.env.APLICATION_BASE_PATH);
    }
    Object.defineProperty(Env.prototype, "APLICATION_BASE_PATH", {
        get: function () {
            return this._APLICATION_BASE_PATH;
        },
        enumerable: true,
        configurable: true
    });
    return Env;
}());
var env = new Env();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = env;
//# sourceMappingURL=Env.js.map