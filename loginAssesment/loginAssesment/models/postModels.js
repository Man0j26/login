import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  userId: "ObjectId",
  isPrivate: { type: Boolean, default: false },
  postedDate: { type: Date, default: Date.now },
});

postSchema.plugin(paginate);

const Post = mongoose.model('Post', postSchema);

export default Post;
