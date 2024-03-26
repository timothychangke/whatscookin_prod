import User from '../models/User.js';

//READ
/**
 * This function retrieves a user by ID from the database. It extracts the user ID from the request parameters and uses Mongoose to find the corresponding user document. 
 * Upon success, it returns the retrieved user object with a 200 status code. In case of errors, it returns a 404 status code indicating "unable to find requested resource" along with the error message.
 * 
 * @date 27/03/2024 - 00:33:11
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const getUser = async (req, res) => {
  try {
    //get id attribute
    const { id } = req.params;
    //find user by id
    const userStoredInDB = await User.findById(id);
    //200 status: successful request
    res.status(200).json(userStoredInDB);

  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ message: err.message });
  }
};

/**
 * This function retrieves a user's friends from the database. It extracts the user ID from the request parameters and finds the user document. 
 * Then, it uses `Promise.all` to efficiently fetch all friend information using the friend IDs stored in the user's document. 
 * Finally, it formats the retrieved friend data before sending it back to the frontend with a 200 status code. 
 * In case of errors, it returns a 404 status code indicating "unable to find requested resource" along with the error message.  
 * 
 * @date 27/03/2024 - 00:33:11
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    //find user by id
    const userStoredInDB = await User.findById(id);
    //multiple calls to grab all friend information
    const allUsersfriends = await Promise.all(
      userStoredInDB.friends.map((id) => User.findById(id))
    );

    //format object before sending to frontEnd
    const allUsersfriendsFormatted = allUsersfriends.map(
      ({ id, firstName, lastName, picturePath }) => {
        return { id, firstName, lastName, picturePath };
      }
    );
    //200 status: successful request
    res.status(200).json(allUsersfriendsFormatted);

  } catch (err) {
    //404 status: unable to find requested resource
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};

//UPDATE
/**
 * This function handles adding or removing a friend for a user. It retrieves the user and friend documents by ID, checks if they're already friends, and updates their friend lists accordingly. 
 * It then saves both documents and retrieves all the user's updated friend information. Finally, it formats the data and sends it back to the frontend with a 200 status code. 
 * Errors are caught with a 404 status code.
 * 
 * @date 27/03/2024 - 00:33:11
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    //find user by id
    const userStoredInDB = await User.findById(id);
    //find friend by id
    const friendStoredInDB = await User.findById(friendId);

    //if friend is already part of friends list
    if (userStoredInDB.friends.includes(friendId)) {
      //remove friend from your list
      userStoredInDB.friends = userStoredInDB.friends.filter((id) => id !== friendId);
      //remove you from your friend's list
      friendStoredInDB.friends = friendStoredInDB.friends.filter((id) => id !== id);
    } else {
      //add friend to your list
      userStoredInDB.friends.push(friendId);
      //add you to friends list
      friendStoredInDB.friends.push(id);
    }

    //save changes
    await userStoredInDB.save();
    await friendStoredInDB.save();

    //multiple calls to grab all friend information
    const allUsersfriends = await Promise.all(
      userStoredInDB.friends.map((id) => User.findById(id))
    );
    //format object before sending to frontEnd
    const allUsersfriendsFormatted = allUsersfriends.map(
      ({ id, firstName, lastName, picturePath }) => {
        return { id, firstName, lastName, picturePath };
      }
    );
    //200 status: successful request
    res.status(200).json(allUsersfriendsFormatted);
    
  } catch (err) {
    //404 status: unable to find requested resource
    res.status(404).json({ message: err.message });
  }
};
