import postDetails from "../module/module.js";

import conversation from "../module/conversation.js";

export const newmessage = async(req,res)=>{
    const ID=req.body.ID
    const name=req.body.name
    const Message=req.body.Message
    const token=req.body.user
    let finish
    
    console.log(token)
    console.log(name);


    const chat = await conversation.findOne({_id:ID})

    if(chat){
   console.log(chat.List);
   const list=chat.List
   let date=new Date()
   list.push({Message:Message,name:name,date:date})
  chat.List=list

  finish =chat.save()


   
 
  date=''
    }
    else{

    }

    let search= await postDetails.findOne({
      ID:name
    })
   
  
  let give=search.FriendID
  let modify=give.filter((item)=>item.Friendname ==token)
  let modify2=give.filter((item)=>item.Friendname !==token)
  console.log(modify);
  console.log(Message)
  modify[0].resentMessage=Message
  modify2.push(modify[0])
  give=modify2
   console.log(give)

   search.FriendID=give
   const find=search.save()
  

   const send=[finish,find]
   res.json(send)
  // console.log(end)
  // console.log(search);
  // res.json(search)
  
  //  const save=search.save()
  //   res.json(save)
  // console.log(modify)
  // modify.resentMessage='arun'
  // give.push(modify[0])
  // search.FriendID=give

  // console.log(search)
  // give[0].resentMessage='muthu'
  // search.FriendID=give
  // const finish2=search.save()
  
  //  console.log(search);
  
  //   res.json(finish2)
}