// default varibales and requirements
let controler_name = "note";
let object_name = "Note";
const Model = require(`../models/${object_name}`)


// notes controller with full CRUD
module.exports = {
    
    add: async(req,res)=> {
        try {
            
            const {
                noteTitle,
                noteContent,
                noteCreator
            } = req.body


            const newNote = new Model({
                noteTitle,
                noteDate: new Date(),
                noteContent,
                noteCreator: noteCreator || ""
            })

            await newNote.save()
            

            return res.status(200).json({
                success:true,
                message:`${controler_name} added!`,
                newNote
            })
        } catch (error) {
            return res.status(500).json({
                message:`error to add ${controler_name}`,
                error:error.message
            })
        }
    },

    getAll: async(req,res)=> {
        try {
            const notes = await Model.find().populate(["noteCreator"]).exec()

            return res.status(200).json({
                success:true,
                message:`all ${controler_name}s shown!`,
                notes
            })
        } catch (error) {
            return res.status(500).json({
                message:`error to get all ${controler_name}s `,
                error:error.message
            })
        }
    },

    getById: async(req,res)=> {
        try {
            const noteById = await Model.findById(req.params.id).populate(["noteCreator"]).exec()

            return res.status(200).json({
                success:true,
                message:`${controler_name} by id shown!`,
                noteById
            })
        } catch (error) {
            return res.status(500).json({
                message:`error to get ${controler_name} by id `,
                error:error.message
            })
        }
    },

    updateById: async(req,res)=> {
        try {
             await Model.findByIdAndUpdate(req.params.id,req.body,{new:true})

            return res.status(200).json({
                success:true,
                message:`${controler_name} by id updated!`,
                
            })
        } catch (error) {
            return res.status(500).json({
                message:`error to update ${controler_name} by id `,
                error:error.message
            })
        }
    },

    deleteById: async(req,res)=> {
        try {
             await Model.findByIdAndDelete(req.params.id)

            return res.status(200).json({
                success:true,
                message:`${controler_name} by id deleted!`,
                
            })
        } catch (error) {
            return res.status(500).json({
                message:`error to delete ${controler_name} by id `,
                error:error.message
            })
        }
    },

    getNotesByUserId : async (req,res) => {

        try {

            const user_id = req.params.user_id

            const notes = await Model.find({noteCreator:user_id}).populate('noteCreator').exec();

            return res.status(200).json({
                success:true,
                message:"success to get notes by user id",
                notes
            })
            
        } catch (error) {
            return res.status(500).json({
                message:`error to get ${controler_name} by user id `,
                error:error.message
            })
        }
    }
}