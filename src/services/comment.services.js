const { Comment } = require("../model/comment.model");

class CommentService {
  //Create new comment
  async createComment(comment) {
    return await comment.save();
  }

  // to get a particular comment
  async getCommentById(commentId) {
    return await Comment.findOne({ _id: commentId, isDeleted: undefined });
  }

  // to get all comments on a post
  async getCommentByPostId(postId) {
    return await Comment.find({
      postId: postId,
      isDeleted: undefined,
    });
  }

  // to get all comments made by a user on a post
  async getCommentsOnPostByUserId(userId, postId) {
    return await Comment.find({
      postId: postId,
      userId: userId,
      isDeleted: undefined,
    });
  }

  // to get a particular comment made by a user on a post
  async getSingleCommentOnPostByUserId(userId, postId, commentId) {
    return await Comment.find({
      postId: postId,
      userId: userId,
      _id: commentId,
      isDeleted: undefined,
    });
  }

  // to get all comments
  async getAllComments() {
    return await Comment.find({ isDeleted: undefined });
  }

  // to update a comment
  async updateCommentById(id, comment) {
    return await Comment.findByIdAndUpdate(
      id,
      {
        $set: comment,
      },
      { new: true }
    );
  }

  // to hard delete a comment
  async deleteComment(id) {
    return await Comment.findByIdAndRemove(id);
  }

  // to soft delete a comment
  async softDeleteComment(id) {
    const comment = await Comment.findById(id);

    // this flags the isDeleted property of the comment to true, telling all get methods not to return it user
    comment.isDeleted = true;

    return await comment.save();
  }
}

module.exports = new CommentService();
