/** @format */

import { Message } from "./../../../model/user.model"
import dbConnect from "@/lib/dbconnect"
import UserModel from "@/model/user.model"
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendverificationemail"

// export async function POST(request:Request){

//     //! we do not it in new next js versions
//     if(request.method!== 'POST'){
//         return Response.json({
//             success:false,
//             message:"Invalid request method only use POST request on this Query",
//         },{status:405})
//     }

//     //? database connection
//     await dbConnect();

//     try {
//         const { username, email,password} = await  request.json();

//         //? existing user verification

//         const ExistingUserVerifiedByUsername = await UserModel.findOne({
//             username,
//             isVerified:true,
//         });

//         if(ExistingUserVerifiedByUsername){
//             return Response.json({
//                 success:false,
//                 Message:"username is already taken "
//             },{status:400})
//         }

//         //? Existing user verified by email

//         const ExistingUserByEmail =await UserModel.findOne({email});

//         //? verification code tenure

//         const Verifiycode = Math.floor(100000 + Math.random() * 900000).toString();

//         if(ExistingUserByEmail){
//             //? existing user is verified or not
//             if(ExistingUserByEmail.isVerified){
//                 return Response.json({
//                     success:false,
//                     Message:"user is already exist with this email "
//                 },{status:400})
//             }else{
//                 const hashedPassword = await bcrypt.hash(password,10);

//                 ExistingUserByEmail.password = hashedPassword;
//                 ExistingUserByEmail.verifyCode = Verifiycode;
//                 ExistingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
//                 await ExistingUserByEmail.save();
//             }
//         }else{
//             const hashedPassword = await bcrypt.hash(password,10);

//             //? verifiyCode expiry date
//             const ExpiryDate = new Date();
//             ExpiryDate.setHours(ExpiryDate.getHours() + 1);

//             //? new user verification model

//                const newUser =  new UserModel({
//                     username,
//                     password:hashedPassword,
//                     email,
//                     verifyCode:Verifiycode,
//                     verifyCodeExpiry:ExpiryDate,
//                     isVerified:false,
//                     isAcceptingMessage:true,
//                     messages:[],
//                   });

//                   //? save new user
//                   await newUser.save();

//         }

//         //? send verification email
//         const EmailResponse  =  await sendVerificationEmail(
//             username,
//             email,
//             Verifiycode,
//         )
//         //? if email is failed
//         if(!EmailResponse.success){
//             return Response.json({
//                 success:false,
//                 Message:EmailResponse.message,
//             },{status:500})
//         }

//         //? if user email got then
//         return Response.json({
//             success:true,
//             Message:"User registered successfully. please verify your email ",
//         },{status:201})

//     } catch (error) {
//         console.error('error registering user ',error)
//         return Response.json(
//             {
//                 success:false,
//                 message:'error registering user'
//             },
//             {
//                 status:500,
//             }
//         )
//     }
// }

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { username, email, password } = await request.json()

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    })

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      )
    }

    const existingUserByEmail = await UserModel.findOne({ email })
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        )
      } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        existingUserByEmail.password = hashedPassword
        existingUserByEmail.verifyCode = verifyCode
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
        await existingUserByEmail.save()
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      })

      await newUser.save()
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    )
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      )
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error registering user:", error)
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    )
  }
}
