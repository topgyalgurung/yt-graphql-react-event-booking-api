const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Authorization: Bearer afkadg(token value)
  const authHeader = req.get("authorization"); //  = Bearer afkadg(token value)
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split("")[1]; //Bearer afkadg- get token val
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken;
  next();
};
