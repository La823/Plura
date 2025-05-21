import React from 'react'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import {dark} from '@clerk/themes';
import Navbar from "./components/navbar";

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
  <ClerkProvider appearance={{baseTheme:dark}}>
   <main className='h-full'> <Navbar />{children}</main>
    
    </ClerkProvider>
  )
}

export default Layout