const mongoose = require("mongoose")
const Schema = mongoose.Schema

// notes schema structure
const noteSchema = new Schema({

    noteTitle:{
        type:String,
        required:true
    },
    noteDate:{
        type:Date,
        required:true
    },
    noteContent:{
        type:String,
    },

    noteCreator:{
       type:mongoose.Types.ObjectId,
       ref:"users",
       required:true
    }
},
   {timestamps:true} 
)

module.exports = mongoose.model("notes",noteSchema)