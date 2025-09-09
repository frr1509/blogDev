import { Post } from "../models/Post.js";

// add
export async function addPost(data) {
  const newPost = await Post.create(data);

  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
}

// delete
export async function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

// edit
export async function updatePost(id, data) {
  const newPost = await Post.findByIdAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  });

  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
}

// get list with pagination and search
export async function getPosts(search = "", limit = 10, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return { posts, lastPage: Math.ceil(count / limit) };
}

// get item
export async function getPost(id) {
  return Post.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}
