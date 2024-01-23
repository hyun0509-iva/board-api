import App from "./app";
import BoardController from "./apis/post/board.controller";
import validateEnv from "./config/validEnv";

validateEnv();
const server = new App([new BoardController()]);

server.listen();
