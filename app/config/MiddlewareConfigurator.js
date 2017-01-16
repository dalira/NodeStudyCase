"use strict";
var bodyParser = require("body-parser");
var compression = require("compression");
var helmet = require("helmet");
var MiddlewareConfigurator = (function () {
    function MiddlewareConfigurator(app) {
        this.app = app;
        this.init();
    }
    MiddlewareConfigurator.prototype.init = function () {
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.json());
    };
    return MiddlewareConfigurator;
}());
exports.MiddlewareConfigurator = MiddlewareConfigurator;
//# sourceMappingURL=MiddlewareConfigurator.js.map