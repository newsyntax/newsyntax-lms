const categoryModel = require("../model/category");

exports.create = async (req, res) => {
  // Code ...
};

exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  res.json(categories);
};

exports.update = async (req, res) => {
  // Code ...
};

exports.delete = async (req, res) => {
  // Code ...
};
