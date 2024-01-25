"use client";

import { useGlobalContext } from "@/context/GlobalContext";

export default function ShuffleBtn() {
  const { selectedPlaylist } = useGlobalContext();

  if (!selectedPlaylist) return null;

  return (
    <div className="my-2">
      <div className="flex justify-center">
        <button
          // onClick={() => fetchUserPlayLists()}
          title="shuflle playlists"
          type="button"
          className="px-8 py-2 text-white text-lg font-medium bg-red-600 hover:bg-opacity-85 duration-300 transition-all rounded-2xl"
        >
          Shuffle Playlist
        </button>
      </div>
    </div>
  );
}
