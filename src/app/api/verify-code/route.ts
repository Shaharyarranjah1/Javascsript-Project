import dbConnect from "@/lib/dbconnect" ;
import UserModel from "@/model/user.model";
import { date } from "zod";


export async function POST(request:Request){
    await dbConnect();

    try {
    const {username ,verifycode} =await request.json();

    const decodedName  = decodeURIComponent(username);
    const user = await UserModel.findOne({username:decodedName})
        
    if(!user){
        return Response.json({
            success:false,
            message:'User not found ',
        },{status:400}
    )
    }

    const isValidCode = user.validate === verifycode ;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new  Date(); 

    if(isValidCode &&  isCodeNotExpired){
        user.isVerified = true;
        await user.save();

        return Response.json({
            success:true,
            message:'account verified successfully ',
        },{status:200}
    )
    } 
    else if(!isCodeNotExpired){
        return Response.json({
            success:false,
            message:'verification code is expired please signUp again to get new code ',
        },{status:400}
    )
    }else{
        return Response.json({
            success:false ,
            message:'Incorrect verification code ',
        },{status:400}
    )
    }

        
    } catch (error) {
        console.error("Error verifying user",error);
        
        return Response.json({
            success:false,
            message:'Error verifying use',
        },{status:400}
    )
        
    }
}