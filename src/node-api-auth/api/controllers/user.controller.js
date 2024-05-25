const User = require('../models/user.model');
//const Airline = require('../models/airlines.model')
const bcrypt = require('bcrypt');
const { validateEmailDB, validatePassword } = require('../../utils/validator');
const { generateToken } = require("../../utils/jwt")

//1º endpoint --> Registro de usuarios
//Prueba postman ruta user/register: OK
const register = async (req, res) => {
  try {
    // creo el documento del usuario
    const userDoc = new User(req.body);
    console.log(req.body);
    //validaciones
    //1.- El usuario no exista. (email)
    const valEmail = await validateEmailDB(req.body.email);
    console.log(valEmail); // devuelve null si no se encuentra  en la BD
    if (!valEmail) {
      //2.- La contraseña cumpla el patron requerido (regex)
      const valPassword = validatePassword(req.body.password);
      if (valPassword) {
        //3.- Encriptar la contraseña  antes de registrarme  HASH
        userDoc.password = bcrypt.hashSync(userDoc.password, 10);
        const createdUser = await userDoc.save();
        return res.status(200).json({ success: true, data: createdUser });
      } else {
        return res.status(200).json({
          success: false,
          message: 'The password does not match the indicated pattern',
        });
      }
    }
    return res
      .status(200)
      .json({ success: false, message: 'The email is already registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
//2º endpoint --> Login usuarios y ruta privada hacia los aviones que tiene cargados el usuario
//Prueba postman ruta user/login: OK
const login = async (req, res) => {
  try {
    const userBody = req.body;
    const userDB = await validateEmailDB(userBody.email)
    if (!userDB) {
      return res.status(200).json({ succe: false, message: "El email no está registrado" })
    }
    if (!bcrypt.compareSync(userBody.password, userDB.password)) {
      return res.status(200).json({ succes: true, message: "contraseña invalida" })
    }
    //generar el token
    const token = generateToken({
      name: userDB.name,
      email: userDB.email,
      _id: userDB._id,
    })
    return res.status(200).json({ success: true, token: token })

  } catch (error) {
    return res.status(500).json(error);
  }
}
//3º endpoint --> Modificacion de usuarios
//Prueba postman ruta user/update: OK -- se modifica el mail del usuario Juan Perez id 66320f80fd0f052367de3e5f
const modifyProfile = async (req, res) => {
  console.log(req.userProfile); // es el usuario con los datos correspondiente al token
  const newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10)
  newUser._id = req.userProfile._id
  console.log(newUser)
  const updateUser = await User.findByIdAndUpdate(req.userProfile._id, newUser, { new: true })
  return res.status(200).json({ data: updateUser })
}

//4º endpoint --> Modificación de usuarios por id para agregar sus aviones
//Prueba postman ruta user/update/id: OK
const updateUser = async (req, res) => {
  try {
    const idUser = req.params.id;
    const idAircraft = req.body.id;
    console.log(idUser, idAircraft);
    const modifyUser = await User.findByIdAndUpdate(
      idUser,
      { $push: { aircraft: idAircraft } },
      { new: true }
    );
    return res.status(200).json(modifyUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//5º endpoint --> visualizar todos los usuarios registrados, sus datos personales y aviones
//Prueba postman ruta user/register: OK
const selectUser = async (req, res) => {
  try {
    const users = await User.find()
      .populate({
        path: 'aircraft',
        select: 'manufacturer model series airline -_id',//filtro de datos, eliminando el id
        populate: {
          path: 'airline',
          select: 'name -_id',//excluyo el id
        }
        
        
      })

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


module.exports = { register, login, modifyProfile, selectUser, updateUser };
