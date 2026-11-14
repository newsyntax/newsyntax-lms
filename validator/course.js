const Validator = require("fastest-validator");
const v = new Validator();
const schema = {
  title: {
    type: "string",
  },
  descritpion: {
    type: "string",
  },
  cover: {
    type: "string",
  },
  creator: {
    type: mongoose.Types.ObjectId,
  },
  category: {
    type: mongoose.Types.ObjectId,
  },
  status: {
    type: "string",
  },
  price: {
    type: "number",
  },
  discount: {
    type: "number",
  },
  href: {
    type: "string",
  },
  support: {
    type: "string",
  },
  $$strict: true,
};

const check = v.compile();
module.exports = check;
