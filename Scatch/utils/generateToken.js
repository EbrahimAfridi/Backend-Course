const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
}

module.exports.generateToken = generateToken;
