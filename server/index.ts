import {app} from "./app";
const port = process.env.PORT || 3000;

Bun.serve({
    port,
    fetch: app.fetch
})


console.log("Server running ...")
