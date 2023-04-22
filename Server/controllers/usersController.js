// default varibales and requirements
let controler_name = "user";
let object_name = "User";
const Model = require(`../models/${object_name}`)
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")


// users controller with full CRUD
module.exports = {
    add: async(req,res)=> {
        try {
            
            const {
                userName,
                userEmail,
                userPassword,
                userPasswordConfirm
            } = req.body

            const newUser = new Model({
                userName,
                userEmail,
                userPassword,
                userPasswordConfirm
            })

            await newUser.save()

            return res.status(200).json({
                success:true,
                message:`${controler_name} added!`,
                newUser
            })
        } catch (error) {
            return res.status(500).json({
                message:`error to add ${controler_name} `,
                error:error.message
            })
        }
    },

    getAll: async(req,res)=> {
        try {
            const users = await Model.find().exec()

            return res.status(200).json({
                success:true,
                message:`all ${controler_name}s shown!`,
                users
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
            const userById = await Model.findById(req.params.id).exec()

            return res.status(200).json({
                success:true,
                message:`${controler_name} by id shown!`,
                userById
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
            const updateById = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true})

            return res.status(200).json({
                success:true,
                message:`${controler_name} by id updated!`,
                updateById
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

    // user login function with the use of bcrypt 
    login: async(req,res)=> {
        try {
            
            const {userEmail,userPassword} = req.body

            const user = await Model.findOne({userEmail})

            if(!user){
                throw new Error("user not found")
            }

            const equal = await bcrypt.compare(userPassword,user.userPassword)

            if(!equal){
                throw new Error("password wrong")
            }


            return res.status(200).json({
                success:true,
                message:"login successfully !",
                user_id:user._id,
            })


        } catch (error) {
            return res.status(500).json({
                message:`error to login ${controler_name}`,
                error:error.message
            })
        }
    },

    logout: async(req,res)=> {
        try {

            return res.status(200).json({
                success:true,
                message:"logout successfully !"
            })

        } catch (error) {
            return res.status(500).json({
                message:`error to logout ${controler_name}`,
                error:error.message
            })
        }
    }
}