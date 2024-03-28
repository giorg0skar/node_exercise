import http from "http";
import app from "./App";

const port = 3000;
const server = http.createServer(app);
server.listen(port);
