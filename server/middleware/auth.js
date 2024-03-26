import jwt from 'jsonwebtoken';

//middleware for routes that require auth token verification
/**
 * This middleware function verifies JWT tokens. It extracts the token from the authorization header, validates its format, and decodes it using the secret key. 
 * If valid, it stores the user information in req.user and continues the request flow. Errors are handled with a 500 status code.
 * 
 * @date 27/03/2024 - 00:35:47
 *
 * @async
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {unknown}
 */
export const verifyToken = async (req, res, next) => {
  try {
    //grab the auth token set by the frontEnd
    let token = req.header('Authorization');
    //403 status: cannot porvide access
    if (!token) return res.status(403).send('Access Denied');
    //it is common notation to add the text 'Bearer ' in front of your authorisation tokens
    if (token.startsWith("Bearer ")) {
      //remove unnecessary "Bearer " string
      token = token.slice(7, token.length).trimLeft();
    }
    //decodes and verifies the JWT with the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    //proceed to next middleware function
    next();

  } catch (err) {
    //500 status: unsuccessful request
    res.status(500).json({ error: err.message });
  }
};
