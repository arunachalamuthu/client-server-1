
import postDetails from "../module/module.js"
import conversation from '../module/conversation.js'


export const search2 = async (req, res) => {
  console.log('search');
  const ID = req.body.ID
  const user = req.body.user
  console.log(ID, user);
 
  let send=[]
  const findID = await postDetails.findOne({ ID: ID })

  if (findID) {

    // const conver = await conversation.findOne({ ID: user, FriendID: ID })
    const conver2=await conversation.findOne({ ID: ID, FriendID: user })
    if (conver2) {
      console.log('match')
    }
    else {
      console.log('no match and create');

      const create1= await conversation({ ID: ID, FriendID: user })
      const chat1=create1.save()
        // const create2= await conversation({ ID: user, FriendID: ID })
        // const chat2=create2.save()
        // console.log(chat2);
      
        
   
 
    send=[chat1]
      const IDcode=create1.id
     
      try {

        const user1 = await postDetails.findOne({ ID: ID })
       const user2 = await postDetails.findOne({ ID: user })
     
        const imagename1=user1.imagename
        const imagename2=user2.imagename
    
        const room1=Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        const room2=Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
      
        console.log(room1,room2);

        const list1 = user1.FriendID
        list1.push({ Friendname: user, mycode:IDcode,Friendcode:IDcode, profilename:`http://localhost:3005/${imagename2}`,room1:room1,room2:room2})
        user1.FriendID = list1
        const finish1 = user1.save()

        
      
        const list2 = user2.FriendID
        list2.push({ Friendname: ID, mycode:IDcode ,Friendcode:IDcode,profilename:`http://localhost:3005/${imagename1}`,room1:room1,room2:room2})
        user2.FriendID = list2

        const finish2 = user2.save()

         send = [finish1, finish2]
      
        res.json(send)
      }
    

      catch (err) {
        console.log(err.message);
      }  
  }

  }
  else {
    console.log('cound not find ID');
  }


}