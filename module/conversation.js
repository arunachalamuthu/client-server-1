import mongoose from "mongoose";

const schema= mongoose.Schema({

     ID:{
        type:String,
        required:true
     },
     FriendID:{
        type:String,
        required:true
     },

      List:[{
         Message:{
            type:String 
        },
        name:{
         type:String
        },
        date: {
         // type:Date,
         // default: Date.now(),
     },
       
      }]


      // List:[{
      //    Message:{
      //       type:String 
      //   },
      //   name:{
      //    type:String
      //   }
        
  
      // }]

      //  List:[{
      //    Message:{
      //       type:String 
      //   },
      //   FriendMessage:{
      //    type:String
      //   }
  
      // }]

})

const conversation=mongoose.model('conversation',schema)
export default conversation