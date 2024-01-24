import BoardRepository from "./board.repository";
import CreatePostDto from "./dto/board.dto";
import IPost from "./interface/board.interface";

class BoardService {
  BoardRepository = new BoardRepository();
  constructor() {}

  /* 게시글 추가 */
  createPost = async (data: CreatePostDto) => {
    const result = this.BoardRepository.createPost(data);
    console.log({ createPost: result });
    return result;
  };

  /* 모든 게시글 조회 */
  getAllPosts = async () => {
    const result = await this.BoardRepository.getAllPosts();
    return result;
  };

  /* 게시글 상세 조회 */
  getPostById = async (id: string) => {
    const result = await this.BoardRepository.getPostById(id);
    return result;
  };

  /* 게시글 수정 */
  updatePost = async (id: string, data: IPost) => {
    const result = await this.BoardRepository.updatePost(id, data);
    return result;
  };

  /* 게시글 삭제 */
  deletePost = async (id: string) => {
    const result = await this.BoardRepository.deletePost(id);
    return result;
  };
}

export default BoardService;
