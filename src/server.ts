import 'module-alias/register';
import App from "./app";
import BoardController from "./apis/post/board.controller";
import validateEnv from "./config/validEnv";
import BoardService from "./apis/post/board.service";

validateEnv();

/* services */
const boardService = new BoardService();

const server = new App([new BoardController(boardService)]);

server.listen();
