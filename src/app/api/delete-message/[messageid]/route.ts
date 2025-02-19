
import { getServerSession } from 'next-auth/next';

import dbConnect from '@/lib/dbconnect';
import UserModel from '@/model/user.model';
import { User } from 'next-auth';
import mongoose from 'mongoose';
import { authOptions } from '../../auth/[...nextauth]/options';


export async function DELETE(request: Request ,{params} :{params :{messageid: string}}){

  const messageid = params.messageid;
    // Connect to the database
    await dbConnect();

    const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  //? getting id with mongoose in the situation if id is in string but instead of this we will get id in real formate 

    try {
      
      //? find the user from db 
      const updateResult = await UserModel.updateOne(
        {_id: user._id},
        //? find the messages document  from db with id 
        
        {$pull: {messages: {_id: messageid}}}

      )

      if( updateResult.modifiedCount == 0){
        return Response.json(
          { success: false, 
            message: 'Message not found or already deleted ' },
          { status: 401 }
        );
      }
      
      //? otherwise 
      return Response.json({
          success:true,
          message: 'message deleted  ' },
        { status: 201 }
      );

    } catch (error) {
      console.error('Error in delete message route',error);
      
      return Response.json(
        { success: false, 
          message: 'Error deleting message ' },
        { status: 500 }
      );
    }

 

}