"use strict";
var express = require("express");
var MainRouter_1 = require("./routes/MainRouter");
var MiddlewareConfigurator_1 = require("./config/MiddlewareConfigurator");
var ValidationError_1 = require("./errors/ValidationError");
var ConnectionFactory_1 = require("./config/ConnectionFactory");
/**
 *Cria e configura o servidor express
 */
var App = (function () {
    function App() {
        //create expressjs application
        this.app = express();
        this.startDataBase();
        this.configureMiddleware();
        this.prepareRoutes();
        this.prepareLastErrorHandler();
        this.app.listen(3000, function () {
            console.log('Checando sistemas!');
        });
    }
    App.bootstrap = function () {
        return new App();
    };
    App.prototype.prepareRoutes = function () {
        new MainRouter_1.MainRouter(this.app);
    };
    App.prototype.configureMiddleware = function () {
        new MiddlewareConfigurator_1.MiddlewareConfigurator(this.app);
    };
    App.prototype.prepareLastErrorHandler = function () {
        this.app.use(function (err, req, res, next) {
            console.log(err);
            if (err.name === ValidationError_1.ValidationError.prototype.name) {
                res.status(400).send(err.message);
            }
            else {
                res.sendStatus(500);
            }
        });
    };
    App.prototype.startDataBase = function () {
        new ConnectionFactory_1.ConnectionFactory("mongodb://localhost/payfast").startConnection();
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=App.js.map