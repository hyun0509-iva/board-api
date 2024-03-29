import PostModel from "./board.model";
import CreatePostDto from "./dto/board.dto";
import IPost from "./interface/board.interface";

class BoardService {
  private Post = PostModel;

  /* 게시글 추가 */
  createPost = async (data: CreatePostDto) => {
    const newPost = new this.Post(data);
    const result = await newPost.save();
    console.log({ createPost: result });
    return result;
  };

  /* 모든 게시글 조회 */
  getAllPosts = async () => {
    const posts = await this.Post.find();
    return posts;
  };

  /* 게시글 상세 조회 */
  getPostById = async (id: string) => {
    const result = await this.Post.findById(id);
    return result;
  };

  /* 게시글 수정 */
  updatePost = async (id: string, data: IPost) => {
    const post = await this.Post.findById(id);
    if (!post) return null;
    const result = await post.updateOne({ $set: data });
    return result;
  };

  /* 게시글 삭제 */
  deletePost = async (id: string) => {
    const post = await this.Post.findById(id);
    if (!post) return null;
    const result = await post.deleteOne();
    return result;
  };
}

export default BoardService;
