'use client'

import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Navbar() {
  const { userProfile } = useGlobalContext()
  const router = useRouter()

  const handleLogOut = () => {
    localStorage.clear();
    router.push("/auth/spotify")
    toast.success('Logged out')
  }

  if (!userProfile) {
    toast.message('refresh to login')
    return null
  }


  return (
    <nav className="w-full">
      <div className="flex justify-between items-center py-[2rem] px-[5%]">
        <h1 className="text-xl font-semibold text-white">hey {userProfile.display_name}</h1>
        <button
          onClick={handleLogOut}
          title="logout"
          type="submit"
          className="px-8 py-2 text-white text-lg font-medium bg-green-600 hover:opacity-85 duration-300 transition-all rounded-2xl max-w-[10rem]"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
