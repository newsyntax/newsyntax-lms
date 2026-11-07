const usersModel = require("../model/user");
const banUsersModel = require("../model/ban-user");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

exports.getUserInfoByItsOwn = async (req, res) => {
  const user = req.user;

  if (user.role === "USER") {
    Reflect.deleteProperty(user, "role");
    return res.json(user);
  }

  res.json(user);
};

exports.updateUserInfoByItsOwn = async (req, res) => {
  const { username, email, profile, oldPassword, newPassword } = req.body;
  const user = await usersModel.findOne({ _id: req.user._id }).lean();

  if (oldPassword && newPassword) {
    const isOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (isOldPassword) {
      const hash = await bcrypt.hash(newPassword, 8);
      await usersModel.updateOne({ _id: req.user._id }, { password: hash });
      return res.json({ message: "your password is upgraded" });
    } else {
      return res.json({ message: "invalid password" });
    }
  }

  await usersModel.updateOne(
    { _id: req.user._id },
    { username, email, profile },
  );
  res.json({ message: "your info is updated" });
};
exports.create = async (req, res) => {
  const { username, fullname, phone, email, password, role } = req.body;
  const isUserExists = await usersModel.findOne({
    $or: [{ username: username }, { email: email }, { phone: phone }],
  });
  if (isUserExists) {
    return res.json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await usersModel.create({
    username,
    fullname,
    phone,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
  const users = await usersModel.find({}).select("-password").lean();
  res.json(users);
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }
  const user = await usersModel.findOne({ _id: id }).select("-password");

  if (!user) {
    return res.json({ message: "no such user" });
  }

  const isUserBanned = await banUsersModel.find({ userID: user._id });
  if (isUserBanned) {
    return res.json({ message: "this user is banned", user });
  }

  res.json(user);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }

  const isUserExists = await usersModel.findOne({ _id: id }).lean();
  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }

  const isUserBanned = await banUsersModel.findOne({
    userID: isUserExists._id,
  });
  if (isUserBanned) {
    return res.json({
      message: "opration faild ,this user is banned",
      user: isUserExists,
    });
  }
  const { username, fullname, phone, email, password, role, profile } =
    req.body;

  await usersModel.updateOne(
    { _id: id },
    { username, fullname, phone, email, password, role, profile },
  );

  res.json({ message: `${isUserExists.fullname} is updated` });
};

exports.upgrade = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }

  const isUserExists = await usersModel.findOne({ _id: id }).lean();
  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }

  const isUserBanned = await banUsersModel.findOne({
    userID: isUserExists._id,
  });
  if (isUserBanned) {
    return res.json({
      message: "opration faild ,this user is banned",
      user: isUserExists,
    });
  }

  const { role } = req.body;

  if (isUserExists.role === role) {
    return res.json({ message: `user is upgrade to ${role} before` });
  }

  await usersModel.updateOne({ _id: id }, { role });
  return res.json({
    message: `${isUserExists.fullname} upgraded to ${role}`,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }

  const isUserExists = await usersModel.findOne({ _id: id }).lean();
  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }

  await usersModel.deleteOne({ _id: id });
  res.json({ message: `${isUserExists.fullname} removed` });
};

exports.getAllBannedUsers = async (req, res) => {
  const bannedUsers = await banUsersModel
    .find({})
    .populate("userID", "-password");
  res.json(bannedUsers);
};

exports.banUser = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);

  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }
  const isUserExists = await usersModel.findOne({ _id: id }).lean();
  const isUserBannedBefore = await banUsersModel.findOne({ userID: id }).lean();

  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }

  if (isUserBannedBefore) {
    return res.json({ message: "user banned before" });
  }

  await banUsersModel.create({ userID: id });
  res.status(201).json({ message: "user banned" });
};

exports.unBanUser = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);

  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }
  const isUserExists = await usersModel.findOne({ _id: id }).lean();

  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }
  const isUserBanned = await banUsersModel.findOne({ userID: id }).lean();
  if (!isUserBanned) {
    return res.json({ message: "user is not banned" });
  }

  await banUsersModel.deleteOne({ userID: id });
  res.json({ message: "user unBaneed" });
};
