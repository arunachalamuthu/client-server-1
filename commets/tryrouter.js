import express from 'express'
import postDetails from '../module/module.js'
import conversation from '../module/conversation.js'
import testServer from '../module/testserver.js'
import { text } from '../components/text.js'
import { search } from '../components/search2.js'
import { message } from '../components/message.js'
const router = express()



// router.get('/chat/:mycode&&:Friendcode', text)

router.get('/chat/:mycode&&:Friendcode', async (req, res) => {
  console.log('chat');

  const mycode = req.params.mycode
  const Friendcode = req.params.Friendcode

  const mychat = await conversation.find({ _id: mycode })
  const Friendchat = await conversation.find({ _id: Friendcode })
  console.log(mychat);
  let MyMessage = []
  let FriendMessage = []
  let length = mychat[0].List.length
  let length2 = Friendchat[0].List.length
  console.log(Friendchat[0].List.length);
  for (let i = 0; i < length; i++) {

    MyMessage.push(mychat[0].List[i])

  }
  for (let i = 0; i < length2; i++) {
    FriendMessage.push(Friendchat[0].List[i].Message)
  }

  const sent = [{
    MyMessage: MyMessage,
    FriendMessage: FriendMessage
  
}]

 
  console.log(sent);
  res.json(sent)









//   const mychat = await conversation.find({ _id: mycode })
//   const Friendchat = await conversation.find({ _id: Friendcode })

//   let sent=[]

//   let MyMessage = []
//   let FriendMessage = []
  
 
//   MyMessage.push(mychat)
//   FriendMessage.push(Friendchat)
//   sent.push({Message:
//     MyMessage,
//     FriendMessage
//   })





  
// console.log(sent);

//   res.json(sent)




  // const chat = await conversation.find({ _id:req.params.name})
  // // const chat = await conversation.find({ ID:req.params.name, FriendID: req.params.Friend })
  // // console.log(chat[0].List.length);

  // // let ID = []
  // console.log(chat);
  // let FriendMessage = []
  // let FriendMessage1 = []
  // let length = chat[0].List.length

  // for (let i = 0; i < length; i++) {

  //   FriendMessage.push(chat[0].List[i].Message)
  //   FriendMessage1.push(chat[0].List[i].FriendMessage)
  // }


  // console.log(FriendMessage)

  // const sent = [{
  //   Message1: FriendMessage,
  //   Message2: FriendMessage1
  // }]

  // res.json(sent)



  // console.log(Message);
  // const {FriendID}=find[0]
  // for (let i = 0; i < FriendID.length; i++) {

  //   ID.push(FriendID[i])
  // }
  // console.log(ID);
  // res.json(ID)


})


router.get('/frontpage/:ID', async (req, res) => {

  const find = await postDetails.findOne({ ID: req.params.ID })

  if (find) {
    const { FriendID } = find
    console.log(FriendID);
    res.json([FriendID])
  }
})

router.post('/search', search)
// try{
// router.post('/seach',search)
// }
// catch(err){
//  console.log(err.message);
// }

router.get('/loginPage/:name&&:Password', async (req, res) => {
  const ID = req.params.name
  const Password = req.params.Password
  const check = await postDetails.findOne({ ID: ID, Password: Password })
  console.log(check);
  if (check) {
    res.json({ message: check })
  }
  else {
    res.json({ result: "you dont have account" })
  }
})

router.post('/login', async (req, res) => {
  const { ID, Password } = req.body



  const check = await postDetails.findOne({ ID: ID, Password: Password })
  if (check) {
    console.log(check);
  }
  else {
    const create = await postDetails({ ID: ID, Password: Password })
    const finish = create.save()
    res.json(finish)

  }
})
// router.post('/:ID', async (req, res) => {
//   const {Message}=req.body
//   console.log(Message)
//   //     const find= await postDetails({
//   //         ID:ID,
//   //         Message:Message
//   // })

//   // const finish =find.save()
//   // res.json(finish)
//     const find=await postDetails.findOne({ID:req.params.ID})
//     console.log(find);
//   if(find !==null){
//     let change=find.Message
//     change.push(Message)
//     find.Message=change
//     const finish =find.save()
//   res.json(finish)
//    }
//   else{}
//       const find= await postDetails({
//         ID:ID,
//         Message:Message
// })
// const finish =find.save()
// res.json(finish)
// }
// })

// router.post('/', async (req, res) => {
//   const {ID,Message}=req.body
//   console.log(ID,Message)

//     const find=await postDetails.findOne({ID:ID})
//     console.log(find);
//   if(find !==null){
//     let change=find.Message
//     change.push(Message)
//     find.Message=change
//     const finish =find.save()
//   res.json(finish)
//    }
//   else{
//         const find= await postDetails({
//           ID:ID,
//           Message:Message
//   })
//   const finish =find.save()
//   res.json(finish)
//    }
// })

router.post('/chat/msg', message)

// router.post('/chat/msg', newmessage)

router.post('/', async (req, res) => {
  const { ID, Message, FriendID, FriendMessage } = req.body

  console.log(ID, FriendID, Message, FriendMessage)

  let idcheck = await postDetails.findOne({ ID })

  if (idcheck) {
    const check = await postDetails.findOne({ ID, FriendID })
    if (check) {
      const conver = await conversation.findOne({ ID, FriendID })
      if (conver) {
        let List = conver.List
        List.push({
          Message: Message,
          FriendMessage: FriendMessage
        }
        )
        conver.List = List
        const finish1 = conver.save()
        res.json(finish1)
      }

    } else {

      let friendcheck = await postDetails.findOne({ ID })
      console.log(friendcheck)
      let finish
      try {
        if (friendcheck) {
          let FriendList = idcheck.FriendID
          FriendList.push(FriendID)
          idcheck.FriendID = FriendList
          console.log(idcheck);
          finish = idcheck.save()
        }
        else {
          let friendcheck = await postDetails({ FriendList: { FriendID: FriendID } })

          finish = friendcheck.save()
        }
        const conver = await conversation({
          ID,
          FriendID,
          List: [{
            Message: Message,
            FriendMessage: FriendMessage
          }]
        })
        const finish2 = conver.save()
        const end = [finish, finish2]
        finish = ''
        res.json(end)

        const Catch = await conversation.findOne({
          ID,
          FriendID,
        })
        if (Catch) {
          console.log('define');
          console.log(Catch);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  else {
    let check = await postDetails({ ID })
    const finish = check.save()
    res.json(finish)
  }

  // const conver =await conversation.findOne({ID,FriendID})
  // try{
  // console.log(conver);
  // if(conver){
  //   let List=conver.List
  //   List.push({Message:Message,
  //     FriendMessage:FriendID}
  //     )
  //   conver.List=List
  //   const finish1=conver.save()
  //   res.json(finish1)
  // }else{
  //  const conver=await conversation({
  //    ID,
  //    FriendID,
  //    List:[{
  //     Message:Message,
  //     FriendMessage:FriendID
  //   }]
  //   })
  //   const finish=conver.save()
  //   res.json(finish)
  // }}
  // catch(error){
  //   console.log(error.message);
  // }
})
export default router