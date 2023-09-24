"use client";

import GeneratePlayListBtn from "@/components/GeneratePlayListBtn";
import Navbar from "@/components/Navbar";
import UserPlayList from "@/components/UserPlayList";
import { useStore } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPlaylists, setUserPlaylists] = useState<any>(null);
  const [error, setError] = useState<string>('')

  // store methods and values
  const selectedPlaylist = useStore((state) => state.selectedPlaylist);
  const setModalMessage = useStore((state) => state.setModalMessage)

  const router = useRouter()

  useEffect(() => {
    let codeVerifier = localStorage.getItem("code_verifier");
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (!codeVerifier || !code) {
      router.push("/auth/spotify")
      return;
    }

    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: process.env.NEXT_PUBLIC_redirect_uri as string,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      code_verifier: codeVerifier,
    });

    axios.post("https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setModalMessage(error.message)
      });

    (async function getProfile() {
      let accessToken = localStorage.getItem("access_token");

      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.status !== 200) {
        setModalMessage("Error fetching profile details");
        setError("Error fetching profile details");
        throw new Error("Network response was not ok");
      }

      setUserProfile(response.data);
      setModalMessage('Login successfull')

    })();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    router.push("/auth/spotify")
    setModalMessage('Logged out')
  };

  const fetchUserPlayLists = async () => {
    let accessToken = localStorage.getItem("access_token");
    setUserPlaylists(null);

    const response = await axios.get(`https://api.spotify.com/v1/users/${userProfile.id}/playlists`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    setUserPlaylists(response.data.items);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <span className="h-10 w-10 rounded-full bg-transparent border-4 border-t-gray-900 border-white animate-spin"></span>
      </div>
    );
  }

  if (error && !userProfile) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <span className="text-lg text-red-700 font-medium">
          {error}, refresh page or login
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar name={userProfile.display_name} handleLogOut={handleLogOut} />
      <div className="w-full py-[2rem] px-[5%]">
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
        <UserPlayList userPlaylists={userPlaylists} />
        {selectedPlaylist && (
          <GeneratePlayListBtn />
        )}
      </div>
    </main>
  );
}
