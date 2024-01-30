import jwt from 'jsonwebtoken';

//middleware for routes that require auth token verification
export const verifyToken = async (req, res, next) => {
  try {
    //grab the auth token set by the frontEnd
    let bearerToken = req.header('Authorization');
    //403 status: cannot porvide access
    if (!bearerToken) return res.status(403).send('Access Denied');
    //it is common notation to add the text 'Bearer ' in front of your authorisation tokens
    if (bearerToken.startsWith('Bearer ')) {
      //remove unnecessary "Bearer " string
      bearerToken = bearerToken.slice(7, token.length).trimLeft;
    }

    //decodes and verifies the JWT with the secret key
    const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = verified;
    //proceed to next middleware function
    next();

  } catch (err) {
    //500 status: unsuccessful request
    res.status(500).json({ error: err.message });
  }
};
