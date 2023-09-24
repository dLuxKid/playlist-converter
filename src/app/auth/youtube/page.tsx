'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';


export default function YTLogin() {
  const route = useRouter()

  let codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    route.push('/auth/spotify')
    return;
  }

  const { data: session } = useSession();

  if (session && session.user) {
    console.log(session.user)
    // route.push('/yt-playlist')
  }





  return (
    <div className="min-w-[250px] h-[100vh] w-full m-auto flex items-center justify-center">
      <form>
        <label className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl font-bold text-white">
            Log into your youtube music account
          </span>
          <button
            onClick={() => signIn()}
            title="login"
            type="submit"
            className="px-8 py-2 text-white text-lg font-medium bg-[#c3352e] hover:opacity-85 duration-300 transition-all rounded-2xl max-w-[10rem] mx-auto"
          >
            Login
          </button>


        </label>
      </form>
    </div>
  );
}
