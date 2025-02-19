import dbConnect from "@/lib/dbconnect";
import {z} from 'zod';
import {usernameValidation} from '@/schemas/signUpSchema';
import UserModel from "@/model/user.model";

//? Username validation checking 

// const UsernameQuerySchema = z.object({
//     username:usernameValidation,
// });

// //? Get request function 

// export async function GET(request:Request){

//     //? request method  checking 
//     //? note : use this in all routes

//     if(request.method!== 'GET'){
//         return Response.json({
//             success:false,
//             message:"Invalid request method only use Get request on this Query",
//         },{status:405})
//     }

//     await dbConnect();

//     try {
        
//         //? username query url 
//         const {searchParams} = new URL(request.url);

//         const QueryParam = {
//             username:searchParams.get('username'),
//             //? localHost://3000/api/username-checking?username = farwa;
//         }
//         //? validate with zod
//         //! note : the safe parse will check if result is save an d validate so give the response otherwise error 
//         const result  = UsernameQuerySchema.safeParse(QueryParam);

//         console.log(result);

//         if(!result.success){
//             const usernameErrors = result.error.format().username?._errors || []; 

//             return Response.json({
//                 success:false,
//                 //? ternary operator 
//                 message:usernameErrors?.length > 0 ? usernameErrors.join(',')
//                 : "Invalid query parameter ",
//             },{status:400})
//         }
//         const {username} = result.data;
        
//         const ExistedVerifiedUser = await UserModel.findOne({username  ,isVerified:true});

//         if(ExistedVerifiedUser){
//             return Response.json({
//                 success:false,
//                 message:"Username is already taken",
//             },{status:400}
//         )}

//         //? else 
//         return Response.json({
//             success:true,
//             message:"username is unique",
//         },{status:200})
        


//     } catch (error) {
//         console.error("Error checking username ", error);

//         return Response.json({
//             success:false,
//             message:'error checking username',
//         },{status:500}
//     )
        
//     }
// }



const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get('username'),
    };

    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Username is unique',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking username:', error);
    return Response.json(
      {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
  }
}