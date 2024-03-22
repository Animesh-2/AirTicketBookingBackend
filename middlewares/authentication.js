const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      res.status(401).send({ msg: "login first" });
    }

    jwt.verify(token, "masai", async function (err, decoded) {
      const userId = decoded.userId;
      req.userId = userId;
      next();
    });
  } catch (error) {
    res.send(error.message);
  }
};



module.exports = { authentication };
