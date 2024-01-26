"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import SongList from "./SongList";

export default function UserPlayList() {
  const {
    userPlaylists,
    selectedPlaylist,
    setSelectedPlaylist,
    setShuffledPlaylist,
    setSelectedPlaylistName,
  } = useGlobalContext();

  const [playlistTracks, setPlayListTracks] = useState<any>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<any>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      return toast.error("Error fetching songs");
    }

    setPlayListTracks(response.data.items);
  };

  const handleSelectedPlaylist = async (item: any) => {
    setSelectedPlaylist(null);
    setShuffledPlaylist(null);
    if (selectedPlaylistId === item.id) {
      setSelectedPlaylistId(null);
      return;
    }
    setSelectedPlaylistId(item.id);

    let accessToken = localStorage.getItem("access_token");

    const response = await axios.get(item.href, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response.status !== 200) {
      return toast.error("Error fetching songs");
    }

    setSelectedPlaylistName(response.data.name);

    setSelectedPlaylist(response.data.tracks.items);
  };

  return (
    <div className="flex flex-col gap-y-5">
      {userPlaylists?.map((item: any, idx: number) => (
        <div key={idx} className="flex gap-3 w-full">
          <span
            className={`border-green-600 border-2 h-4 w-4 rounded-full cursor-pointer mt-6 ${
              selectedPlaylist &&
              selectedPlaylistId === item.id &&
              "bg-green-600 border-gray-800"
            }`}
            onClick={() => handleSelectedPlaylist(item)}
          />
          <div className="flex items-start flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <img
                  src={item.images[item.images.length - 1].url}
                  alt="playlist thumbnail"
                  height={100}
                  width={100}
                />
                <p className="ml-4">{item.name}</p>
              </div>
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
                  <SongList key={idx} item={item} />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
