import User from '../models/User.js';

//READ
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
