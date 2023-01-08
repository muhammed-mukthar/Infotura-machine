const { verifyJwt } = require("../utils/jwt");
const { get } = require("lodash");

module.exports.VerifyToken = async (req, res, next) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) {
    res.status(401).json({ err: "you are not permited " });
  } else {
    const { decoded, expired } = verifyJwt(accessToken, "accessTokenSecret");
    if (decoded) {
      req.user = decoded;
      return next();
    } else if (expired) {
      res.status(401).json({ err: "Please login again" });
    }
  }
};

module.exports.VerifyTokenAdmin = async (req, res, next) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) {
    res.status(401).json({ err: "you are not permited " });
  } else {
    const { decoded, expired } = verifyJwt(accessToken, "accessTokenSecret");
    if (decoded) {
      console.log(decoded);
      const {isadmin}=decoded
      if(!isadmin){
        res.status(401).json({ err: "you are not allowed to do it " });
      }
      req.user = decoded;
      return next();
    } else if (expired) {
      res.status(401).json({ err: "Please login again" });
    }
  }
};

