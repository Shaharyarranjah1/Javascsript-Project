


// import React from 'react'

// import Link from 'next/link';
// import { useSession,signOut } from 'next-auth/react';
// import {User} from 'next-auth'
// import { Button } from '@/components/ui/button';

// function Navbar() {
    
//     //? exclude the data from session 
//     const {data:Session } = useSession(); 

//     //? exclude the user from session 

//     const user:User = Session?.user as User ;


//   return (
//     <>
    
//     <nav>
//         <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
//             <a className='text-xl font-bold mb-4 md:mb-0' href="#">MyStry Messages</a>
//             {
//                 Session ? (
//                     <>
//                     <span className='mr-4'>Welcome , {user?.username || user?.email}</span>
//                     <Button className='w-full md:w-auto' onClick={()=> signOut()}>Logout</Button>
//                     </>
//                 ) : (
//                     <>
//                    <Link  href= "/sign-in"></Link>
//                    <Button  className='w-full md:w-auto'> Login</Button>
//                     </>
//                 ) 
//             }
//         </div>
//     </nav>
//     </>
//   )
// }

// export default Navbar


'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user:User = session?.user as User

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Mestry Messages 
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;