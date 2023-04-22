const { default: mongoose } = require("mongoose")
const moongoose = require("mongoose")
moongoose.set("strictQuery",true)


// function that connects mongodb to the server via mongoose
const connection = async (req,res)=> {
    try {
        const uri = "mongodb://127.0.0.1:27017/notes"
        await mongoose.connect(uri)
        console.log("DB connected!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection