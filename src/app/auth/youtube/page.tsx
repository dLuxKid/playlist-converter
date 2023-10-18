'use client'

import { useGlobalContext } from '@/context/GlobalContext';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

export default function YTLogin() {

  const route = useRouter()

  const { selectedPlaylist } = useGlobalContext()

  if (!selectedPlaylist) {
    route.back()
    return;
  }

  const signIn = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });


  return (
    <div className="min-w-[250px] h-[100vh] w-full m-auto flex items-center justify-center">
      <form action={() => signIn()}>
        <label className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl font-bold text-white">
            Log into your youtube music account
          </span>
          <button
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
