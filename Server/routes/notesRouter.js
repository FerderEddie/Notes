// router requires
var express = require('express');
var router = express.Router();
const { newNoteValidation } = require('../middlewares/validations');

// CRUD functions
const {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
  getNotesByUserId
} = require("../controllers/notesController");

// CRUD requests
router.post("/add",newNoteValidation,add)
router.get("/getAll",getAll)
router.get("/getByid/:id",getById);
router.get('/getNotesByUserId/:user_id',getNotesByUserId)
router.put("/update/:id",updateById)
router.delete("/delete/:id",deleteById)

module.exports = router;