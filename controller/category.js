const categoryModel = require("../model/category");

exports.create = async (req, res) => {
  const { href, title } = req.body;
  const isCategoryExists = await categoryModel.findOne({ href });
  if (isCategoryExists) {
    return res.json({ message: "category is already exists" });
  }
  const category = await categoryModel.create({ title, href });
  res.json(category);
};

exports.getAll = async (req, res) => {
  const categories = await categoryModel.find({});
  res.json(categories);
};

exports.update = async (req, res) => {
  const { href, title } = req.body;
  const isCategoryExists = await categoryModel.findOne({ _id: req.params.id });
  if (!isCategoryExists) {
    return res.json({ message: "no such category" });
  }

  await categoryModel.updateOne({ _id: req.params.id }, { title, href });
  res.json({ message: "category updated" });
};

exports.delete = async (req, res) => {
  // Code ...
};
