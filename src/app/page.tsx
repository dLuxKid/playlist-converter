import FetchUserPlaylistsBtn from "@/components/FetchUserPlaylistsBtn";
import Navbar from "@/components/Navbar";
import ShowShuffledPlaylist from "@/components/ShowShuffledPlaylist";
import ShuffleBtn from "@/components/ShuffleBtn";
import UserPlayList from "@/components/UserPlayList";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="w-full py-[2rem] px-6 md:px-[5%]">
        <FetchUserPlaylistsBtn />
        <UserPlayList />
        <ShuffleBtn />
        <ShowShuffledPlaylist />
      </div>
    </main>
  );
}
