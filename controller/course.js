const courseModel = require("../model/course");

exports.getAll = async (req, res) => {
  // Code ...
};

exports.create = async (req, res) => {
  // Code ...
  const {
    title,
    descritpion,
    cover,
    creator,
    category,
    status,
    price,
    discount,
    href,
    support,
  } = req.body;
};

exports.update = async (req, res) => {
  // Code ...
};

exports.remove = async (req, res) => {
  // Code ...
};

exports.getCourseDetails = async (req, res) => {
  // Code ...
};
