"use strict";
var PagamentoRouter_1 = require("./PagamentoRouter");
var UsuarioRouter_1 = require("./UsuarioRouter");
var AutenticationMiddleware_1 = require("../config/AutenticationMiddleware");
var MainRouter = (function () {
    function MainRouter(app) {
        this.app = app;
        this.init();
    }
    MainRouter.prototype.init = function () {
        //Free
        this.app.use(UsuarioRouter_1.default);
        //Secure
        this.app.all("*", AutenticationMiddleware_1.default.interceptRequest());
        this.app.use(PagamentoRouter_1.default);
    };
    return MainRouter;
}());
exports.MainRouter = MainRouter;
//# sourceMappingURL=MainRouter.js.map