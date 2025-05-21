'use client'

import Link from 'next/link'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import  ModeToggle from '@/components/global/mode-toggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full px-4 md:px-10 py-4 flex items-center justify-between bg-background border-b border-border">
      <Link href="/" className="text-2xl font-black tracking-wide text-primary">
        Plura
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/features" className="hover:text-primary">Features</Link>
          <Link href="/pricing" className="hover:text-primary">Pricing</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-md md:hidden flex flex-col gap-4 p-4 z-50">
          <Link href="/features" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      )}
    </nav>
  )
}
