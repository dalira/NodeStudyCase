"use strict";
var PagamentoRouter_1 = require("./PagamentoRouter");
var MainRouter = (function () {
    function MainRouter(app) {
        this.app = app;
        this.init();
    }
    MainRouter.prototype.init = function () {
        this.app.use(PagamentoRouter_1.default);
    };
    return MainRouter;
}());
exports.MainRouter = MainRouter;
//# sourceMappingURL=MainRouter.js.map