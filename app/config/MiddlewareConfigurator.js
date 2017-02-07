"use strict";
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
var AutenticationMiddleware_1 = require("../config/AutenticationMiddleware");
var MiddlewareConfigurator = (function () {
    function MiddlewareConfigurator(app) {
        this.app = app;
        this.init();
    }
    MiddlewareConfigurator.prototype.init = function () {
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(AutenticationMiddleware_1.default.initialize());
    };
    return MiddlewareConfigurator;
}());
exports.MiddlewareConfigurator = MiddlewareConfigurator;
//# sourceMappingURL=MiddlewareConfigurator.js.map