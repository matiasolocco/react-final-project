const express = require('express');
const router = express.Router();
const { register, login, modifyProfile, selectUser, updateUser } = require('../controllers/user.controller');
const { isAuth } = require("../../middleware/auth");

//1ª endpoint para regitrar un nuevo usuario
router.post('/register', register);
//2º endpoint para logear al usuario y ver sus aricrafts
router.post("/login", login);
//3º enpoint modificar un usuario mediante autenticación
router.put("/update", [isAuth], modifyProfile);
//4º endpoint para ver todos los usuarios y sus aircrafts
router.get('/select', selectUser);
//5º endpoint para actualizar a un usuario por su id
router.put('/update/:id', updateUser);


module.exports = router;
