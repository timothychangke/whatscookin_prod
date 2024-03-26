import mongoose from 'mongoose';

//creating a post schema with attributes
/**
 * This defines a Mongoose schema for storing post data. The schema includes fields for user identification, post content (header, description, picture), user and post picture paths, 
 * a `likes` map to store liking users, and an array for comments. Additionally, it automatically timestamps posts upon creation or update.  
 * 
 * @date 27/03/2024 - 00:36:42
 *
 * @type {*}
 */
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    postHeader: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

/**
 * This line of code creates a Mongoose model named `Post`. It essentially translates the `postSchema` you defined earlier into a functional model that can be used to interact with posts within your MongoDB database. 
 * In simpler terms, it creates a blueprint for your posts and gives it the name "Post" so you can use it to perform actions like creating, retrieving, updating, and deleting posts.  
 * 
 * @date 27/03/2024 - 00:36:42
 *
 * @type {*}
 */
const Post = mongoose.model("Post", postSchema)

export default Post;
