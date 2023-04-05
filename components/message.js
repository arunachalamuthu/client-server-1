import postDetails from "../module/module.js";

import conversation from "../module/conversation.js";

export const message = async(req,res)=>{
    const ID=req.body.ID
    const name=req.body.name
    const Message=req.body.Message
    // console.log(ID);
    // console.log();
    // console.log(Message);
    const chat = await conversation.findOne({_id:ID})

    if(chat){
  //  console.log(chat.List);
   const list=chat.List
   list.push({Message:Message,name:name})
  chat.List=list
  const finish =chat.save()
  res.json(finish)
    }
    else{

    }
}