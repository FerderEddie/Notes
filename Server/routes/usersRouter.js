// router requires
var express = require('express');
var router = express.Router();
// validation middlewares
const { newUserValidation, loginValidation } = require('../middlewares/validations');

// CRUD functions
const {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
  login,
  logout,
} = require("../controllers/usersController");

// CRUD requests
router.post("/add",newUserValidation,add)
router.get("/getAll",getAll)
router.get("/getByid/:id",getById)
router.put("/update/:id",updateById)
router.delete("/delete/:id",deleteById)
router.post("/login",loginValidation,login)
router.get("/logout",logout);

module.exports = router;
