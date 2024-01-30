import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//registering a user
export const register = async (req, res) => {
  try {
    //get user attributes
    const { firstName, lastName, email, password, picturePath, friends, bio } =
      req.body;

    //generate salt for hashing
    const salt = await bcrypt.genSalt();
    //hashing of password
    const passwordHash = await bcrypt.hash(password, salt);
    //store hash of password

    //create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      bio,
    });

    //save user to mongooseDB
    const savedUser = await newUser.save();
    //201 status: successful creation
    res.status(201).json(savedUser);

  } catch (err) {
    //500 status: unsuccessful request
    res.status(500).json({ error: err.message });
  }
};

//logging in
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find the email in mongoose
    const userStoredInDB = await User.findOne({ email: email });
    //400 status: client-side error
    if (!userStoredInDB) return res.status(400).json({ msg: 'User does not exist. ' });

    //check password hash with password hash saved in database
    const passwordMatch = await bcrypt.compare(password, userStoredInDB.password);
    //400 status: client-side error
    if (!passwordMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

    //issue jwt token
    const authToken = jwt.sign({ id: userStoredInDB.id }, process.env.JWT_SECRET);
    //remove password before forwarding to the frontEnd
    delete userStoredInDB.password;
    //200 status: successful request
    res.status(200).json({ authToken, userStoredInDB });

  } catch (err) {
    //500 status: unsuccessful request
    res.status(500).json({ error: err.message });
  }
};
