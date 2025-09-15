const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  // create users resolver
  createUser: async (args) => {
    try {
      // check if user already exists
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      // if not, continue create new user by hashing input password
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  // login resolver
  login: async ({ email, password }) => {
    // check email password combination correct
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user does not exist");
    }
    const isEqual = await bcrypt.compare(password, user.password); // result is true or false
    if (!isEqual) {
      // if not true
      throw new Error("PASSWORD is incorrect ");
    }
    // now we have user and pw correct, so create token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
};
