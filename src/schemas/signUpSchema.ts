import {z} from "zod"

  export const usernameValidation = z
   .string()
   .min(3,"username must be at least 2 characters")
   .max(20,"username must be at most 20 characters")
   .regex( /^[a-zA-Z0-9]+$/,"username must not contain special characters")



   //? signUp schema  validation 

   export const signUpSchema =  z.object({
    username: usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password: z.string().min(8,{message:"password must be at least 8 characters"})
   })

