const UserModel = require("../models/userModel");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  console.log("index");
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log("show");
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  UserModel.findById(req.params.id, (err, data) => {
    if (!err) res.send(data);
    else console.log("ID unknown : " + req.params.id);
  }).select("-password");
};

module.exports.updateUser = (req, res) => {
  console.log("update");
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  const { email, pseudo } = req.body;
  // console.log(pseudo);
  if (req.file !== undefined) {
    console.log(req.file)
  }
  try {
    const user = UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          email,
          pseudo,
          picture: req.file === undefined ? "random-user.png" : req.file.filename,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, data) => {
        if (!err) {
          return res.send(data);
        }
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
