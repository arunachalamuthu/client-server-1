import mongoose from "mongoose";

const schema = mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    Password: {
        type: String,

    },
    imagename:{
    type:String
    },
    // profilename:{
    //  type:String
    // },
    date: {
        type:Date,
        default: Date.now(),
    },

    FriendID: [{

        Friendname: {

        },
        mycode: {

        },
        Friendcode: {

        },
        profilename:{
           type:String
        } ,
        room1:{

        },
        room2:{

        },
        resentMessage:{
        type:String
        },
         date: {
            type:Date,
            default: Date.now(),
        },

    }
    ]

    // FriendID:{
    //     name:[{
    //         Friendname:{

    //         },
    //         code:{

    //         }
    //     }]
    // },
    // FriendID:{
    //     type:Array
    // }


})

const postDetails = mongoose.model('NewMessage', schema)
export default postDetails