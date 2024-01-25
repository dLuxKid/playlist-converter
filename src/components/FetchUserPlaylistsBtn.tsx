"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";

export default function FetchUserPlaylistsBtn() {
  const { userProfile, userPlaylists, setUserPlaylists } = useGlobalContext();

  const fetchUserPlayLists = async () => {
    let accessToken = localStorage.getItem("access_token");
    setUserPlaylists(null);

    const response = await axios.get(
      `https://api.spotify.com/v1/users/${userProfile.id}/playlists`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    setUserPlaylists(response.data.items);
  };

  if (!userProfile) return null;

  return (
    <div className="flex justify-center">
      {!userPlaylists?.length && (
        <button
          onClick={() => fetchUserPlayLists()}
          title="fetch playlists"
          type="button"
          className="px-8 py-2 text-white text-lg font-medium bg-green-600 hover:opacity-85 duration-300 transition-all rounded-2xl"
        >
          fetch playlists
        </button>
      )}
    </div>
  );
}
