const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = {
  async register(data) {
    try {
      let email = data.email;
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return "User Already Exist. Please Login";
      }

      // Create user in our database
      const user = await User.create(data);

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;

      // return new user
      return user;
    } catch (err) {
      console.log(err);
    }
  },

  async login(data) {
    try {
      const { email, password } = data;
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
        return user;
      }
      return "Invalid Credentials";
    } catch (error) {
      return error;
    }
  },
};
