import { NextFunction, Request, Response, Router } from "express";
import PostModel from "./board.model";
import PostDto from "./dto/board.dto";
import NotFoundException from "../../exceptions/notFoundException";
import { Controller } from "interfaces/controller";

class BoardController implements Controller {
  private Post = PostModel;
  public path: string = "/posts";
  public router: Router = Router();

  constructor() {
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
      const data: PostDto = req.body;
      const newPost = new this.Post(data);
      await newPost.save();
      res.send({ isOk: true, msg: "게시글이 저장되었습니다.", result: newPost });
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
      const post = await this.Post.find();
      if (!post) {
        next(new NotFoundException());
      }
      res.status(200).json({isOk: true, result: post});
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
      const post = await this.Post.findById(id);
      if (!post) {
        next(new NotFoundException());
      }
      res.status(200).json({isOk: true, result: post});
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
      const data: PostDto = req.body;
      const post = await this.Post.findById(id);
      console.log(post)
      if (!post) {
        next(new NotFoundException());
      }
      await post.updateOne({ $set: data });
      res.status(200).json({isOk: true, msg: "게시글이 수정되었습니다."});
    } catch (error) {
      console.log('error', error)
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
      const post = await this.Post.findById(id);
      if (!post) {
        next(new NotFoundException());
      }
      const result = await post.deleteOne();
      res.status(200).json({isOk: true, msg: "게시글이 삭제되었습니다.", result});
    } catch (error) {
      next(error);
    }
  };
}

export default BoardController;
