import express from "express";
import { authenticated } from "../middlewares/authenticated.js";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";
import { mapPost } from "../helpers/mapPost.js";
import { hasRole } from "../middlewares/hasRole.js";
import { addComment, deleteComment } from "../controllers/comment.js";
import { mapComment } from "../helpers/mapComment.js";
import { ROLES } from "../constans/roles.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  return res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  return res.send({ data: mapPost(post) });
});

router.delete(
  "/:postId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ data: true });
  }
);

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  return res.send({ data: mapComment(newComment) });
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    image: req.body.imageUrl,
  });

  res.send({ data: mapPost(newPost) });
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const editPost = await updatePost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    return res.send({ data: mapPost(editPost) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);

    res.send({ data: true });
  }
);

export default router;
