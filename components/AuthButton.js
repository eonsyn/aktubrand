'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm">Hi, {session.user.name || session.user.username}</p>
        <button
          className="px-3 py-1 rounded bg-red-500 text-white"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 rounded bg-blue-500 text-white"
        onClick={() => signIn("google")}
      >
        Login with Google
      </button>
      
    </div>
  );
}
