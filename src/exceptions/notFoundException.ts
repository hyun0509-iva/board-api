import HttpException from "./httpException";

class NotFoundException extends HttpException {
  constructor() {
    super(404, "게시글이 존재하지않습니다.");
  }
}

export default NotFoundException;
