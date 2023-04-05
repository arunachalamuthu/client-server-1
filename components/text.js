
import postDetails from "../module/module.js";
import conversation from "../module/conversation.js";

export const text = async(req,res)=>{

  const mycode = req.params.mycode
  const Friendcode = req.params.Friendcode

  const mychat = await conversation.find({ _id: mycode })
  const Friendchat = await conversation.find({ _id: Friendcode })
  console.log(mychat[0].List[0].name);
  let MyMessage = []
  let FriendMessage = []
  let length = mychat[0].List.length
  let length2 = Friendchat[0].List.length

  for (let i = 0; i < length; i++) {

    MyMessage.push({chat:mychat[0].List[i].Message,name:mychat[0].List[i].name})

  }
  for (let i = 0; i < length2; i++) {
    FriendMessage.push(Friendchat[0].List[i].Message)
  }

  const sent = [{
    MyMessage: MyMessage,
    FriendMessage: FriendMessage
  
}]

 
  console.log(sent[0].MyMessage[0].chat);
  // res.json(sent)



}