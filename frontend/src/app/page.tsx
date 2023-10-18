// components
import FetchUserPlaylistsBtn from "@/components/FetchUserPlaylistsBtn";
import GeneratePlayListBtn from "@/components/GeneratePlayListBtn";
import Navbar from "@/components/Navbar";
import UserPlayList from "@/components/UserPlayList";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="w-full py-[2rem] px-6 md:px-[5%]">
        <FetchUserPlaylistsBtn />
        <UserPlayList />
        <GeneratePlayListBtn />
      </div>
    </main>
  );
}
