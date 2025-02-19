import { resend } from "@/lib/resend";

import VerificationEmail from '../../emails/verificationemail';

import { ApiResponse } from "@/types/apiresponse";
import { StringValidation } from "zod";


//? email verification function 

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,

): Promise<ApiResponse>{

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'message app verification code',
            react: VerificationEmail({username, otp:verifyCode}),
          });


        return {success:true , message:"verification email send successfully"}
    } catch (EmailError) {
        console.error('Failed to send email verification code ',EmailError);
         return {success:false,message:'verification email code not sent ',}

    }
}