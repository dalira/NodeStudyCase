"use strict";
var cluster = require("cluster");
var os = require("os");
var App_1 = require("./app/App");
cluster.on("listening", function (worker) { return console.log("Slave no ar: PID %d", worker.process.pid); });
cluster.on("exit", function (worker, signal) {
    console.log("Slave finalizado. Código: %d", signal);
    cluster.fork();
});
if (cluster.isMaster) {
    os.cpus().forEach(function () { return cluster.fork(); });
}
else {
    new App_1.App();
}
//# sourceMappingURL=cluster.js.map