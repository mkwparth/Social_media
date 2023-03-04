const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require('cors')
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config();

const mongoURI='mongodb://localhost:27017/social';
mongoose.connect(mongoURI,()=>{
    console.log("Connected to MongoDB Server Sucessfully.");
})
 mongoose.set('strictQuery', true);

app.use("/images",express.static(path.join(__dirname,"public/images")));
// middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),async (req,res)=>{
    try {
        return res.status(200).json("file uploaded Successfully !!");
        
    } catch (err) {
        console.log(err)
        
    }
})


app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);
app.listen(8800,()=>{
    console.log("Backend is Running ... ")
})
