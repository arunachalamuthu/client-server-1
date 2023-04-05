import mongoose from "mongoose";

const schema= mongoose.Schema({

username:{
    type:String,
    
},
//   ID:[
//     {
//         name:{
//             type: String
//         }
//     }
//   ]
ID:{
    name:[{
        user:{

        },
        password:{
            
        }
    }]
}
 

})

const testServer=mongoose.model('testServer',schema)
export default testServer