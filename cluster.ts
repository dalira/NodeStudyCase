import * as cluster from "cluster";
import * as os from "os";
import {App} from "./app/App";
import {Worker} from "cluster";

cluster.on("listening", (worker : Worker)=> console.log("Slave no ar: PID %d", worker.process.pid));

cluster.on("exit", (worker : Worker, signal : number) => {
    console.log("Slave finalizado. Código: %d", signal);
    cluster.fork();
});

if (cluster.isMaster) {
    os.cpus().forEach(()=> cluster.fork());
}else{
    new App();
}