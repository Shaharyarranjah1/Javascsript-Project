import mongoose,{Schema,Document} from "mongoose";

//? message schema with type script addition
  export interface Message extends Document{
    content: string ;
    createdAt: Date;
    updatedAt: Date;

  }

 //? message schema 
  const messageSchema :Schema<Message>= new Schema({
    content:{
        type:String,
        required:true,
    
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true,
    }
  })

  //? users schema with type script addition
  export interface User extends Document{
     username:string;
     password:string;
     email:string;
     verifyCode:string;
     verifyCodeExpiry:Date;
     isVerified:boolean;
     isAcceptingMessages:boolean;
     messages:Message[];



  }

  //? user schema
  const userSchema :Schema<User>= new Schema({
     username:{
        type:String,
        required:[true ,"username is required "],
        trim:true,
        unique:true,
     },
     email:{
        type:String,
        required:[true ,"email is required "],
        unique:true,
        match:[/.+\@.+/,"please use a valid email address"]
     },
     password:{
        type:String,
        required:[true ,"password is required "],
     },
     verifyCode:{
        type:String,
        required:[true ,"verify Code is required "],
     },
     verifyCodeExpiry:{
        type:Date,
        required:[true ,"verify Code Expiry is required "],
     },
       isVerified:{
        type:Boolean,
        default:false,
       },
       isAcceptingMessages:{
            type:Boolean,
            default:false,
         },
        messages:[messageSchema]
  })

  const UserModel = 
  (mongoose.models.User as mongoose.Model<User>) ||(mongoose.model<User>("User",userSchema,))


  export default UserModel;
