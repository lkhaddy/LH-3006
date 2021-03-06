const jwt = require("jsonwebtoken");
//Using JWT to check authentication
module.exports = (req,res, next) => {
  try{
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken =jwt.verify(token, "secret_this_should_be_long");
  req.userData = { email: decodedToken.email, userId: decodedToken.userId };
  next();
  } catch(error) {
    res.status(401).json({message: 'Not authenticated'});
  }
};
