
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbconnect';
import UserModel from '@/model/user.model';
import { User } from 'next-auth';
import mongoose from 'mongoose';


export async function GET(request: Request){
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

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
     //? dose a aggregation pipeline with mongodb 
    const user = await UserModel.aggregate([
      //! writing the pipelines in aggregation 

      //? first pipeline : find the unique user with unique id 
      {$match :{id:userId}},

      //? second pipeline unwind the user massages from array 

      {$unwind: 'messages'},

      {$sort: {'messages.createdAt': -1}},

      //? third pipeline groupe the messages  by user id 

      {$group: {_id: '$_id', messages:{$push : "$messages " }}},

    ])

    if(!user || user.length === 0){
      return Response.json(
        { success: false, message: 'user not found' },
        { status: 401 }
      );
    }

    //? if user founded 

    return Response.json(
      { success: true, 
        message: user[0].messages },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { success: false, 
        message: "messages error",
      },
      { status: 401 }
    );

  }

}