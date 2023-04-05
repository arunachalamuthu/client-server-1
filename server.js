import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import routerPost from './router/router.js'
import multer from 'multer'
import { fileURLToPath } from 'url';
import path from 'path'
import { dirname } from "path"
import postDetails from './module/module.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app =express()
app.use(express.json())
app.use(cors())



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

mongoose.connect('mongodb+srv://muthu:muthu17@cluster0.jp1wrus.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db =mongoose.connection

db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('connect the database'))


app.use(express.static('public'))
let imagename=''
let upload=multer({
  storage:multer.diskStorage({
      destination:(req,file,cd)=> {
cd(null,'public')
      },
      filename:function (req,file,callback){
        imagename=file.fieldname+'-' +Date.now() +path.extname(file.originalname)
        callback(null,imagename)
        // console.log(file.fieldname+'-' +Date.now() +path.extname(file.originalname));
        // imagename=file.fieldname+'-' +Date.now() +path.extname(file.originalname)
      }

  })

})
app.post('/ready',upload.single("image"),(req,res)=>{
  
  console.log(imagename)
  console.log('upload');

})



app.post('/login', async (req, res) => {
  const { ID, Password } = req.body



  const check = await postDetails.findOne({ ID: ID, Password: Password })
  if (check) {
    console.log(check);
  }
  else {
    const create = await postDetails({ ID: ID, Password: Password, imagename:imagename })
    const finish = create.save()
    res.json(finish)

  }
})

imagename=''
app.use('/',routerPost)

app.listen(3005,()=>{
    console.log('connect the server')
})
