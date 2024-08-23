const { hash, genSalt } = require("bcrypt");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const User = require('../models/User');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');


exports.register = async (req, res, next) => {
  const { name, username, email, password, role, phoneNumber, address } = req.body;

  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      address,
      phoneNumber
    });
    user.__factory = { autoIncrementField: 'id' }
    var id = user.id;
    res.status(201).json({
      message: 'Success Creating New User',
      data: { id, name, username, email, role, phoneNumber, address }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) throw new UnauthenticatedError("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthenticatedError("Invalid email or password");
    }


    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    let name = user.name;
    let role = user.role;
    let id = user.id;

    const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ accessToken, name, role, id });

  } catch (error) {
    next(error);
  }
}