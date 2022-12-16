import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: []},
  likesCount: { type: Number, default: 0},
  comments: { type: [String], default: [] },
  commentsCount: { type: Number, default: 0 },
  rating: {type: Number, default: 0},
  category: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
