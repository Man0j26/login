import Post from '../models/postModels.js';
import User from '../models/userModel.js';

const createPost = async (req, res) => {
  const { title, description, image, isPrivate } = req.body;

  try {
    const post = new Post({ title, description, image, isPrivate, userId: req.params.userId });
    await post.save();
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}



const allPost = async (req, res) => {

  const { page, sort } = req.body

  let mongooseQuery = {
    isPrivate: false
  }

  const user = User.findOne({ _id: req.params.id, role: "admin" })

  if (user == null) {
    return res.status(500).json({ message: 'Oops!, Admin can access the all post' });
  }

  const posts = await Post.paginate(mongooseQuery, {
    'page': page,
    'sort': { createdAt: sort != null && sort != 'null' ? -1 : 1 },
    'limit': 10
  })


  return res.status(200).json(posts);

}


const myPost = async (req, res) => {

  console.log("kkjdaqeg", req.params.id)

  const { page, sort } = req.body

  let mongooseQuery = {
    userId: req.params.id
  }

  const myposts = await Post.paginate(mongooseQuery, {
    'page': page,
    'sort': { createdAt: sort != null && sort != 'null' ? -1 : 1 },
    'limit': 10
  })


  return res.status(200).json(myposts);

}


const individualPost = async (req, res) => {

  let user
  let post

  try {

    user = User.findOne({ _id: req.params.id, role: "admin" })

    if (user != null) {
      post = Post.findOne({ _id: req.params.postId, userId: req.params.id })

      if (post == null) {
        return res.status(404).json({ message: "post not found" })
      }

    } else {

      post = Post.findone({ _id: req.params.postId, userId: req.params.id })

      if (post == null) {
        return res.status(404).json({ message: "post not found" })
      }
    }
    return res.status(200).json({ post })
  } catch (error) {
    return res.status(500).json({ message: "admin can see all posts or you can see your own post only" })
  }

}


const editPost = async (req, res) => {

  const { title, description, image, isPrivate } = req.body

  let user
  let post

  try {

    user = User.findOne({ _id: req.params.id, role: "admin" })

    if (user != null) {
      post = Post.findOne({ _id: req.params.postId, userId: req.params.id })

      if (post == null) {
        return res.status(404).json({ message: "post not found" })
      }

    } else {

      post = Post.findone({ _id: req.params.postId, userId: req.params.id })

      if (post == null) {
        return res.status(404).json({ message: "post not found" })
      }
    }


    if (title != null) {
      post.title = title
    }
    if (description != null) {
      post.description = description
    }
    if (image != null) {
      post.image = image
    }
    if (isPrivate != null) {
      post.isPrivate = isPrivate
    }


    await post.save()

    return res.status(200).json({ message: "post updated successfully" })
  }
  catch (error) {

    return res.status(500).json({ message: "admin can edit all posts or you can edit your own post only" })
  }

}




const deletePost = async (req, res) => {

  let user
  let post


  try {
    user = User.findOne({ _id: req.params.id, role: "admin" })

    if (user != null) {
      post = Post.findOne({ _id: req.params.postId, userId: req.params.id })

      if (post == null) {
        return res.status(404).json({ message: "post not found" })
      }

    } else {

      post = Post.findone({ _id: req.params.postId, userId: req.params.id })

      if (post == null) {
        return res.status(404).json({ message: "post not found" })
      }
    }

    await post.delete()
    return res.status(200).json({ message: "post deleted successfully" })
  }
  catch (error) {

    return res.status(500).json({ error: "admin can delete all posts or you can delete your own post only" })

  }

}


export { createPost, allPost, individualPost, myPost, editPost, deletePost }

