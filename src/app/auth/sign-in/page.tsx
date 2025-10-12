import { SignInForm } from '@/components/SignInForm'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
  return (
      <div className="bg-primary/5 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="inline-flex items-center justify-center size-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
            {/* <Sparkles className="w-8 h-8 text-white" /> */}
            
          </div>
          Arogyasathi
        </Link>
        <SignInForm />
      </div>
    </div>
  )
}

export default SignInPage