var UserService = require("../services/user");
var ErrorLog = require("../services/error");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    const dataToSave = {
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };
    let createUSer = await UserService.register(dataToSave);
    if (createUSer) {
      return res.status(200).send(createUSer);
    }
  } catch (error) {
    //  handle errors here
    let errname = error.name;
    let errmsg = error.message;
    let customerror = "Error: User Controller -> register";
    const dataToSave = { errname, errmsg, customerror };
    const errors = await ErrorLog.createErrorlog(dataToSave);
    return res.status(200).send({
      errors,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const dataToSave = { email, password };

    let user = await UserService.login(dataToSave);
    if (user) {
      return res.status(200).send(user);
    }
  } catch (error) {
    //  handle errors here
    let errname = error.name;
    let errmsg = error.message;
    let customerror = "Error: User Controller -> login";
    const dataToSave = { errname, errmsg, customerror };
    const errors = await ErrorLog.createErrorlog(dataToSave);
    return res.status(200).send({
      errors,
    });
  }
};

exports.welcome = async (req, res, next) => {
  res.status(200).send("Welcome 🙌 ");
};
