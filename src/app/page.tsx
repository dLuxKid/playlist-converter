"use client";

import Navbar from "@/components/Navbar";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPlaylists, setUserPlaylists] = useState<any>(null);
  const [playlistTracks, setPlayListTracks] = useState<any>(null);
  const [error, setError] = useState<string>('')


  const [selectedPlaylistId, setSelectedPlaylistId] = useState<any>(null);

  // store methods and values
  const selectedPlaylist = useStore((state) => state.selectedPlaylist);
  const setSelectedPlaylist = useStore((state) => state.setSelectedPlaylist);
  const setModalMessage = useStore((state) => state.setModalMessage)


  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let codeVerifier = localStorage.getItem("code_verifier");
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (!codeVerifier || !code) {
      window.location.href = "http://localhost:3000/auth/spotify";
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
    window.location.href = "http://localhost:3000/login";
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

  const { refetch: fetchUserPlaylist } = useQuery({
    queryKey: ['fetchPlaylist'],
    queryFn: fetchUserPlayLists,
    enabled: false,
    onError() {
      setModalMessage("Error fetching playlists");
    }
  })
  const fetchSongs = async (href: string, index: number) => {
    let accessToken = localStorage.getItem("access_token");
    setPlayListTracks(null);
    setActiveIndex(activeIndex === index ? null : index);

    const response = await axios.get(href, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response.status !== 200) {
      setModalMessage("Error fetching songs");
      throw new Error("Network response was not ok");
    }

    setPlayListTracks(response.data.items);
  };

  const handleSelectedPlaylist = (item: any) => {
    if (selectedPlaylistId === item.id) {
      setSelectedPlaylistId(null)
      setSelectedPlaylist(null);
      return
    }
    setSelectedPlaylistId(item.id);
    setSelectedPlaylist(item);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <span className="h-10 w-10 rounded-full bg-transparent border-4 border-t-gray-900 border-white animate-spin"></span>
      </div>
    );
  }

  if (error) {
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
              onClick={() => fetchUserPlaylist()}
              title="fetch playlists"
              type="button"
              className="px-8 py-2 text-white text-lg font-medium bg-green-600 hover:opacity-85 duration-300 transition-all rounded-2xl"
            >
              fetch playlists
            </button>
          )}
        </div>
        <div className="flex flex-col gap-y-5">
          {userPlaylists?.map((item: any, idx: number) => (
            <div key={idx} className="flex gap-4 w-full">
              <span
                className={`border-green-600 border-2 h-4 w-4 rounded-full cursor-pointer mt-6 ml-4 ${selectedPlaylist &&
                  selectedPlaylistId === item.id &&
                  "bg-green-600 border-gray-800"
                  }`}
                onClick={() => handleSelectedPlaylist(item)}
              ></span>
              <div className="flex items-center flex-col w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="flex items-center">
                    <img
                      src={item.images[item.images.length - 1].url}
                      alt="playlist thumbnail"
                      height={item.images[item.images.length - 1].height}
                      width={item.images[item.images.length - 1].width}
                    />
                    <p className="ml-4">{item.name}</p>
                  </span>
                  <p className="flex flex-col items-center justify-center">
                    <span>{item.tracks.total} songs</span>
                    {!playlistTracks && activeIndex === null && (
                      <span
                        className="hover:text-green-600 font-semibold underline cursor-pointer"
                        onClick={() => fetchSongs(item.tracks.href, idx)}
                      >
                        see all
                      </span>
                    )}
                    {playlistTracks && activeIndex === idx && (
                      <span
                        className="hover:text-green-600 font-semibold underline cursor-pointer"
                        onClick={() => {
                          setPlayListTracks(null);
                          setActiveIndex(null);
                        }}
                      >
                        close
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 mt-4">
                  {playlistTracks &&
                    activeIndex === idx &&
                    playlistTracks.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="w-full flex flex-wrap items-center justify-start border border-black rounded-2xl p-2"
                      >
                        <p className="mr-2">{item.track.name}</p>
                        by
                        <span className="flex flex-wrap">
                          {item.track.artists.map((i: any, idx: number) => (
                            <p key={idx} className="ml-1">
                              {i.name}{" "}
                            </p>
                          ))}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedPlaylist && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              title="generate playlist"
              type="button"
              className="px-8 py-2 text-white text-lg font-medium bg-[#f94c57] hover:opacity-85 duration-300 transition-all rounded-2xl"
            >
              <Link href={"/auth/apple"}>Generate Apple Playlist</Link>
            </button>
            <button
              title="generate playlist"
              type="button"
              className="px-8 py-2 text-white text-lg font-medium bg-[#c3352e] hover:opacity-85 duration-300 transition-all rounded-2xl"
            >
              <Link href={"/auth/youtube"}>
                Generate Youtube Music Playlist
              </Link>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}