import { DefaultSession } from "next-auth";
import { User } from "./../model/user.model";


//? in this file when we work on jwt and session storage for user so we get some error because we cant access any property in the jwt or session so we declare a new interface of user model basic properties which we need in the jwt or session  and basically its mean we modify our user model interface in this file 


import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id? : string;
        username?: string ;
        isVerified? : boolean ;
        isAcceptingMessage? : boolean ;
    }

    //? redefine and modify the user interface model for session storage 

    interface Session {
        user: {
            _id? : string;
            username?: string ;
            isVerified? : boolean ;
            isAcceptingMessage? : boolean ;
        } & DefaultSession['user']
        //? what will  the default in the session 
    }
}

//? A another way to write the  same code

declare module 'Next-auth/jwt '{
    interface jwt {
        _id? : string;
        username?: string ;
        isVerified? : boolean ;
        isAcceptingMessage? : boolean ;
    }
}