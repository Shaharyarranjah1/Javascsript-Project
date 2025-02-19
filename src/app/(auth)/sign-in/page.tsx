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
import { signIn } from 'next-auth/react';
import { signInSchema } from '@/schemas/signInSchema';
import { log } from 'console';
import { Result } from 'postcss';
export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
     
    //? next auth authentication signIn page 

     const result = await signIn(" credentials", {
      redirect:false,
      identifier: data.identifier,
      password: data.password,
    })
    console.log(result);
    
    //? its optional if you want to do like that so do 
    
    // if(result?.error){
    //   console.log(result?.error);
      
      
    //   toast({
    //     title:"Login Failed ",
    //     description:"Incorrect password or email ",
    //     variant:"destructive"
    //   })
    // }
    
    //! another way for do same above thing 

    if(result?.error){
      if(result.error == 'CredentialsSignin'){
        toast({
          title:"login failed ",
          description:"Incorrect Password or Email ",
          variant:"destructive"
        })
      }else{
        toast({
            title:"Error ",
            description:result.error,
            variant:"destructive"
        })
      }
    }
    if(result?.url){
      router.replace("/dashboard")
    }
  };
    
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} name="email/username" />
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
              signin
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
           create a new account ?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
//?  end{code}