//  "use client"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z  from "zod"
// import React, { useEffect, useState } from 'react'
// import {useDebounceValue} from 'usehooks-ts';
// import Link from "next/link"
// import { useToast } from "@/components/ui/use-toast"
// import { useRouter } from "next/navigation"
// import { signUpSchema } from "@/schemas/signUpSchema"
// import axios, { AxiosError } from 'axios'
// import { ApiResponse } from "@/types/apiresponse"
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "postcss"



// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/components/ui/use-toast';
// import axios, { AxiosError } from 'axios';
// import { Loader2 } from 'lucide-react';
// const Page = () => {
//   //? states of username 

//   const [username , setUsername ] = useState('');
//   const [usernameMessage, setUsernameMessage ] = useState('');
//   const [isCheckingUsername, setIsCheckingUsername ] = useState(false);
//   const [submitting , setSubmitting ] = useState(false);

//   const debounceUsername = useDebounceValue(username ,300);

//      //? import toaster 

//      const {toast} = useToast();
//      const router = useRouter();


//      //! zod implementation 
 
//      const form = useForm<z.infer<typeof signUpSchema>>({
//       resolver:zodResolver(signUpSchema),
//       defaultValues: {
//         username: '',
//         email:'',
//         password:''
//       }
//      })

//      //? hooks 

//      //? useEffect hook 

//      useEffect(()=> {
//       const checkUsernameUnique = async ()=> {

//       if(debounceUsername){
//         setIsCheckingUsername(true)

//         setUsernameMessage('')

//         try {
//            //? get request on backend from frontend 

//            const response  = await axios.get(`/api/username-unique?username=${debounceUsername}`)
//         } catch (error) {
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message  ?? "Error: username Checking "
//           )
//       }finally{
//         setIsCheckingUsername(false)
//       }
//       }
//     }

//      checkUsernameUnique();
    


//      },[debounceUsername])

//      //?data submit handler  from frontend

//      const onSubmit = async (data: z.infer<typeof signUpSchema>)=> {
//       setSubmitting(true);

//       try {
//         const response  = await axios.post<ApiResponse>('/api/sign-up',data);
//         console.log(response);

//         toast({
//           title:"success",
//           description: response.data.message
//         }) 

//         //? replace the page with router 

//         router.replace(`/verify/${username}`)
 
//         setSubmitting(false);
        
//       } catch (error) {
//         console.error("Error in signUp of user",error)
//         const axiosError = error as AxiosError<ApiResponse>;
          
//           let errorMessage =   axiosError.response?.data.message ;

//           toast({
//             title:"signUp failed",
//             description: errorMessage,
//             variant: "destructive"
//           })
//           setSubmitting(false)
//       }
//      }

//   return (

//     <>
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join True Feedback
//           </h1>
//           <p className="mb-4">Sign up to start your anonymous adventure</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="username"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <Input
//                     {...field}
//                     onChange={(e) => {
//                       field.onChange(e);
//                       setUsername(e.target.value);
//                     }}
//                   />
//                   {isCheckingUsername && <Loader2 className="animate-spin" />}
//                   {!isCheckingUsername && usernameMessage && (
//                     <p
//                       className={`text-sm ${
//                         usernameMessage === 'Username is unique'
//                           ? 'text-green-500'
//                           : 'text-red-500'
//                       }`}
//                     >
//                       {usernameMessage}
//                     </p>
//                   )}
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <Input {...field} name="email" />
//                   <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input type="password" {...field} name="password" />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className='w-full' disabled={submitting}>
//               { submitting? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 'Sign Up'
//               )}
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Already a member?{' '}
//             <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Page 

'use client'


import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ApiResponse } from "@/types/apiresponse"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {useDebounceCallback} from 'usehooks-ts'
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username message'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" />
                  <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
