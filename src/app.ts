import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import errorMiddleware from "./middleware/error.middleware";
import { Controller } from './interfaces/controller';

class App {
  app: Application;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.initMeddlewares();
    this.connectDB();
    this.initControllers(controllers);
    this.initializeErrorHandling()
  }

  private initMeddlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }
  private initControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
      this.app.use("/", (req: Request, res: Response) =>
        res.send("웹서버 연결")
      );
    });
  }

  private connectDB() {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    try {
      mongoose.connect(process.env.MONGO_PATH, {dbName: 'blog'});
    } catch (err) {
      console.error(err);
    }

    mongoose.connection.on("connected", () => {
      console.log("몽고디비에 연결되었습니다. 😊");
    });
    mongoose.connection.on("disconnected", this.connectDB);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Express listening on port " + process.env.PORT);
    });
  }
}

export default App;
