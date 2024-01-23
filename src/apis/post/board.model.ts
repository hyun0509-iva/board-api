import { Document, Schema, model } from "mongoose";
import Post from "./interface/board.interface";

const PostSchema = new Schema({
  title: String,
  content: String,
},{
  timestamps: true,
  versionKey : false 
});

const PostModel = model<Post & Document>("Post", PostSchema);
export default PostModel;
