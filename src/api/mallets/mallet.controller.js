const mallets = require("./mallet.model");
const User = require("../users_sorcerer/user.model");
const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");

const postNewmallets = async (req, res, next) => {
  try {
    const newmallets = new mallets();
    newmallets.name = req.body.name;
    newmallets.color = req.body.color;
    newmallets.type = req.body.type;
    newmallets.format_game = req.body.format_game;
    newmallets.card = req.body.card;
    newmallets.dock = req.body.dock;
    // if (req.file) {
    //     newmallets.img = req.file.path
    // }
    const malletsDB = await newmallets.save();
    return res.status(201).json(malletsDB);
  } catch (error) {
    return next(setError(500, "mallet not saved"));
  }
};

const getAllmallets = async (req, res, next) => {
  try {
    const malletsDB = await mallets
      .find()
      .populate("card")
      .exec((err, dock) => {
        if (!dock) {
          res.status(404).send({ message: "No existe el dock" });
        } else {
          mallets.populate(dock, { path: "dock" }, (err) => {
            if (err) {
              res.status(500).send({ message: "Error en la peticion a la BD" });
            } else {
              res.status(200).json(dock);
            }
          });
        }
      });
  } catch (error) {
    return next(setError(500, "mallet failed server"));
  }
};

const getmallets = async (req, res, next) => {
  try {
    const { id } = req.params;
    const malletsDB = await mallets
      .findById(id)
      .populate("card")
      .populate("dock");//fallo en node_modules pero con resultado exitoso
    res.status(200).json(malletsDB);
    if (!malletsDB) {
      return next(setError(404, "mallet not found"));
    }
    return res.status(200).json(malletsDB);
  } catch (error) {
    return next(setError(500, "mallet server error"));
  }
};

const patchmallets = async (req, res, next) => {
  try {
    const { uid, mallid } = req.params;
    const patchmallets = new mallets(req.body);
    patchmallets._id = mallid;
    console.log({ uid, mallid });
    try {
      const UserDB = await User.find({ _id: uid, mallets: [mallid] });
      console.log({ UserDB });
      if (!UserDB?.length) {
        // (UserDB != Undefined && UserDB.length > 0) Si la longitud es distinta a 0 y el usuario no existe, entra
        return next(setError(401, "Unauthorize"));
      }
    } catch (e) {
      console.log({ error: e });
    }
    const malletsDB = await mallets.findByIdAndUpdate(mallid, patchmallets);
    if (!malletsDB) {
      return next(setError(404, "mallet not found"));
    }
    if (malletsDB.img) deleteFile(malletsDB.img);
    return res.status(200).json({ new: patchmallets, old: malletsDB });
  } catch (error) {
    return next(setError(500, "mallet Patch server error"));
  }
};
// CON ESTE CODIGO OTRO USUARIO PODRÍA ACTUALIZAR LOS MALLETS
// const patchmallets = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const patchmallets = new mallets(req.body);
//     patchmallets._id = id;
//     if (req.file) {
//       patchmallets.img = req.file.path;
//     }
//     const malletsDB = await mallets.findByIdAndUpdate(id, patchmallets);
//     if (!malletsDB) {
//       return next(setError(404, "mallet not found"));
//     }
//     if (malletsDB.img) deleteFile(malletsDB.img);
//     return res.status(200).json({ new: patchmallets, old: malletsDB });
//   } catch (error) {
//     return next(setError(500, "mallet Patch server error"));
//   }
// };

const deletemallets = async (req, res, next) => {
  try {
    const { id } = req.params;
    const malletsDB = await mallets.findByIdAndDelete(id);
    if (!malletsDB) {
      return next(setError(404, "mallet not found"));
    }
    if (malletsDB.img) deleteFile(malletsDB.img);
    return res.status(200).json(malletsDB);
  } catch (error) {
    return next(setError(500, "mallet removed server error"));
  }
};

module.exports = {
  postNewmallets,
  getAllmallets,
  getmallets,
  patchmallets,
  deletemallets,
};
