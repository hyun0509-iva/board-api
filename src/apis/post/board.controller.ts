import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "@/interfaces/controller";
import NotFoundException from "@/exceptions/notFoundException";
import PostDto from "./dto/board.dto";
import BoardService from "./board.service";

class BoardController implements Controller {
  public path: string = "/posts";
  public router: Router = Router();

  constructor(private BoardService: BoardService) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(this.path, this.createPost);
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.updatePost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postData: PostDto = req.body;
      const result = await this.BoardService.createPost(postData);
      console.log({ ctrl: result });
      res.send({ isOk: true, msg: "게시글이 저장되었습니다.", result });
    } catch (error) {
      next(error);
    }
  };

  private getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.BoardService.getAllPosts();
      if (!result) {
        return next(new NotFoundException
          ());
      }
      res.status(200).json({ isOk: true, result });
    } catch (error) {
      next(error);
    }
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const result = await this.BoardService.getPostById(id);
      console.log({ctrl: result})
      if (!result) {
        return next(new NotFoundException());
      }
      res.status(200).json({ isOk: true, result });
    } catch (error) {
      next(new NotFoundException());
    }
  };
  private updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const postData: PostDto = req.body;
      const result = await this.BoardService.updatePost(id, postData);
      if (!result) {
        return next(new NotFoundException());
      }
      res.status(200).json({ isOk: true, msg: "게시글이 수정되었습니다." });
    } catch (error) {
      next(error);
    }
  };
  private deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const result = await this.BoardService.deletePost(id);
      console.log({ctrl: result})
      if (!result) {
        return next(new NotFoundException());
      }
      res
        .status(200)
        .json({ isOk: true, msg: "게시글이 삭제되었습니다.", result });
    } catch (error) {
      next(error);
    }
  };
}

export default BoardController;
