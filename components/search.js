
import postDetails from "../module/module.js"
import conversation from '../module/conversation.js'


export const getProfile= async(req,res)=>{
  const profilename1=req.para
}

export const search = async (req, res) => {
  console.log('search');
  const ID = req.body.ID
  const user = req.body.user
  console.log(ID, user);
 
  let send=[]
  const findID = await postDetails.findOne({ ID:ID })
 
  if (findID) {
    console.log(findID.imagename)
    const conver = await conversation.findOne({ ID: user, FriendID: ID })
    const conver2=await conversation.findOne({ ID: ID, FriendID: user })
    if (conver||conver2) {
      console.log('match')
    }
    else {
      console.log(findID.imagename)
      console.log('no match and create');

      const create1= await conversation({ ID: ID, FriendID: user })
      const chat1=create1.save()
        const create2= await conversation({ ID: user, FriendID: ID })
        const chat2=create2.save()
        console.log(chat2);
      
        
      // const idcheck = await conversation.findOne({ ID: user, FriendID: ID })

    // if (idcheck) {
 
    send=[chat1,chat2]
      const IDcode=create1.id
      const usercode=create2.id
      try {
    
      
       
        const user1 = await postDetails.findOne({ ID: ID })
        const user2 = await postDetails.findOne({ ID: user })

        console.log(user1);
        
        console.log(imagename1,imagename2);
        const list1 = user1.FriendID
        list1.push({ Friendname: user, mycode:IDcode,Friendcode:usercode, profilename:imagename2 })
        user1.FriendID = list1
        const finish1 = user1.save()

        
        console.log(user2);
        const list2 = user2.FriendID
        list2.push({ Friendname: ID, mycode:usercode ,Friendcode:IDcode,profilename:imagename1 })
        user2.FriendID = list2

        const finish2 = user2.save()

         send = [finish1, finish2]
        console.log(send);
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










  // const conver= await conversation.findOne({_id:'641b54dbc2c7c1061ca0c088'})

  // const finish= conver.save()
  // res.json(finish)
  // console.log(conver);



  //    postDetails.findOne({

  //     ID:'arv'

  //   }).then((data)=> {console.log(data)
  //   return data  
  // }
  //   ).then((change)=> {


  //     return postDetails(

  //              { ID:ID },
  //            {
  //             FriendID: {
  //               Friendname:user,
  //               code:'1234'
  //             },
  //           },

  //           { ID:user },
  //           {
  //            FriendID: {
  //              Friendname:ID,
  //              code:'1234'
  //            },
  //          },

  //          )




  // const list= change.FriendID
  // list.push({
  //     Friendname:ID,
  //     code:'1234567'
  // })
  // change.FriendID=list

  // return change
  // })

  // })

  //   const finish=find.save()
  //res.json(find)








  // if(userID){
  //     console.log(userID);
  // const search = await postDetails.findOne(

  //     { ID:ID },

  //        {
  //         FriendID: {
  //           Friendname:user
  //         },
  //       },


  //      )
  // if(search){

  // console.log(search);



  // try{
  //    const firstID=userID.FriendID.name
  //    firstID.push({ Friendname:ID})
  //    userID.FriendID.name=firstID
  //    const finish1=userID.save()

  //    const secID=search.FriendID.name
  //    secID.push({Friendname:user})
  //    search.FriendID.name=secID
  //    const finish2=search.save()

  //    const send=[finish1,finish2]

  //    res.json(send)
  // }
  // catch(err){console.log(err.message);}


  // console.log(search);
  // const firstID=userID.FriendID
  // firstID.push({Friendname:ID})
  // userID.FriendID=firstID
  // const finish1=userID.save()

  // const secID=search.FriendID
  // secID.push({Friendname:user})
  // search.FriendID=secID
  // const finish2=search.save()

  // const send=[finish1,finish2]
  // res.json(send)




  //    const id= await postDetails.findOne({ID:ID})
  //   console.log(id);

  //     const two=id.FriendID
  //     two.push({Friendname:'zrun',code:'12345'})
  //     id.FriendID=two

  //     const finish=id.save()
  //     res.json(finish)

  //     }
  //     else{
  //         console.log('no match');
  //     }


  // }else{

  // }

}