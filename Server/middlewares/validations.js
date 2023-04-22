
module.exports = {

    // middleware that handles with possible errors before adding a new user
    newUserValidation: async(req,res,next)=> {
        try {

            // regex for email and password
            emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/

            // body requirements
            const {
                userName,
                userEmail,
                userPassword,
                userPasswordConfirm
            } = req.body

            
            // validations
            if(!userName || !userEmail || !userPassword || !userPasswordConfirm){
                throw new Error("all fields required")
            }

            if(!emailRegex.test(userEmail)){
                throw new Error("email invalid")
            }

            if(!passwordRegex.test(userPassword)){
                throw new Error("password invalid - password requirements: small letter, big letter, at least one digit and minimum 8 characters")
            }

            if(userPassword !== userPasswordConfirm){
                throw new Error("confirm password")
            }

            next()

        } catch (error) {
            return res.status(500).json({
                message:"error in user validation",
                error:error.message
            })
        }
    },

    // middleware that handles with possible errors before login a user
    loginValidation: async(req,res,next)=> {
        try {
            
            // body requirements
            const {userEmail,userPassword} = req.body

            if(!userEmail || !userPassword){
                throw new Error("all fields required")
            }

            next()

        } catch (error) {
            return res.status(500).json({
                message:"error in login validation",
                error:error.message
            })
        }
    },

    // middleware that handles with possible errors before adding a new note
    newNoteValidation: async(req,res,next)=> {
        try {
            
            // body requirements
            const {
                noteTitle
            } = req.body

            if(!noteTitle){
                throw new Error("title required")
            }

            next()

        } catch (error) {
            return res.status(500).json({
                message:"error in note validation",
                error:error.message
            })
        }
    }
}