import { resend } from "@/lib/resend";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbconnect";
import { Message } from "@/model/user.model";


export async function POST(request:Request ){
    await dbConnect(); 
    
    //? get the messages data from frontend 

    const {username , content} =await request.json();
    try {
        
        const user = await UserModel.findOne({username});

        if(!user){
            return Response.json(
                { success: false, 
                  message: "user not found "},
                { status: 500 }
              );
          
        }
        //? is user accepting the  messages 


        if(!user.isAcceptingMessages){
            return Response.json(
                { success: false, 
                  message: "user is not accepting messages "},
                { status: 500 }
              );
          
        }

        //? make a new message 


        const newMessage = {content , createdAt:new Date()} ;

        user.messages.push(newMessage as Message); 

        //? save the user 
        await user.save(); 

        return Response.json(
            { success: true, 
              message: "user sent message successfully" },
            { status: 200 }
          );
      

    } catch (error) {
        console.log("Error ending message",error);
        return Response.json(
            { success: false, 
              message: "Internal server error " },
            { status: 500 }
          );
      
    }
}

