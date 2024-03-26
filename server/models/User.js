import mongoose from 'mongoose';

//creating a user schema with attributes
/**
 * This function defines a Mongoose schema named `UserSchema` for storing user information. It specifies required fields like names and email with validation constraints, 
 * an optional password field, and additional user details such as profile picture, friends list, and bio. The schema also enables automatic timestamping of document creation and updates.
 * 
 * @date 27/03/2024 - 00:38:29
 *
 * @type {*}
 */
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    bio: String,
  },
  { timestamps: true }
);

/**
 * This line of code creates a Mongoose model named "User" using the previously defined "UserSchema".  In essence, it translates the schema into a functional model that your application can use to interact with user data in your MongoDB database.  
 * Simply put, it creates a blueprint for your users and gives it the name "User" so you can use it to perform actions like creating, retrieving, updating, and deleting users.  
 * 
 * @date 27/03/2024 - 00:38:29
 *
 * @type {*}
 */
const User = mongoose.model('User', UserSchema);
export default User;
