import Post from '../models/Post.js';
import User from '../models/User.js';

//CREATE
//create a new post
export const createPost = async (req, res) => {
  try {
    //get post attributes
    const { userId, description, picturePath, postHeader } = req.body;
    //find user by id
    const userStoredInDB = await User.findById(userId);
    //create new post with attributes
    const newPost = new Post({
      userId,
      firstName: userStoredInDB.firstName,
      lastName: userStoredInDB.lastName,
      postHeader: userStoredInDB.postHeader,
      description: userStoredInDB.description,
      userPicturePath: userStoredInDB.picturePath,
      picturePath,
      likes: {},
      comments: {},
    });

    //save into the mongoDB
    await newPost.save();

    //grab all posts including the new post
    const allPosts = await Post.find();
    //201 status: successful creation
    res.status(201).json(allPosts);

  } catch (err) {
    //409 status: unable to create resource
    res.status(409).json({ message: err.message });
  }
};

//READ
//read all posts
export const getFeedPosts = async (req, res) => {
  try {
    //grab all posts
    const allPosts = await Post.find();
    //200 status: successful request
    res.status(200).json(allPosts);

  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    //get user id
    const { userId } = req.params;
    //find post vis userId
    const postByUser = await Post.find({ userId });
    //200 status: successful request
    res.status(200).json(postByUser);

  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};

//UPDATE
export const likePost = async (req, res) => {
  try {
    //id comes from params
    const { id } = req.params;
    //userId comes from body
    const { userId } = req.body;

    //find post by id
    const postByUser = await Post.findById(id);
    //see whether the post is already liked or not
    const isPostLiked = postByUser.likes.get(userId);

    if (isPostLiked) {
      //delete key
      postByUser.likes.delete(userId);
    } else {
      //set new key
      postByUser.likes.set(userId, true);
    }

    //update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: postByUser.likes },
      { new: true }
    );
    //200 status: successful request
    res.status(200).json(updatedPost)
    
  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ messaage: err.message });
  }
};
