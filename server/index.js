require("dotenv").config()
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const router = require("./routes/index")


const PORT = process.env.PORT || 5000

const express  = require("express")




const app = express()
app.use(cors())
app.use(express.json())
app.use("/api",router)

// app.get("/", (req,res)=>{
//     res.status(200).json({message: "WORKING!!!"})
// })


const start = async ()=>{
    try {
       await sequelize.authenticate()
       await sequelize.sync()
        app.listen(PORT , ()=> console.log(`Server on started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
 