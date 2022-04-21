const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json("Token is not valid!");

      req.user = user;

      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const tokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id, "id찾기");
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Your are not allowed to do that!");
    }
  });
};

const tokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Your are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, tokenAuthorization, tokenAdmin };
