import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'

export default function App() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-600 rounded-lg">Sign In to resumeSpace</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <p>Welcome to resumeSpace, {user?.firstName}</p>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}