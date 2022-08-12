require("dotenv").config()
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandleMiddleware")
const path = require("path")


const PORT = process.env.PORT || 5000

const express  = require("express")




const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static" )))
app.use(fileUpload({}))
app.use("/api",router)

// обработка ошибок, Middleware должен быть последним
app.use(errorHandler)

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
 