'use client'

import { useStore } from "@/store/store";
import axios from "axios";
import { useState } from "react";


interface Props {
    userPlaylists: any
}

export default function UserPlayList({
    userPlaylists,
}: Props) {

    const [playlistTracks, setPlayListTracks] = useState<any>(null);

    const [selectedPlaylistId, setSelectedPlaylistId] = useState<any>(null);

    // store methods and values
    const selectedPlaylist = useStore((state) => state.selectedPlaylist);
    const setSelectedPlaylist = useStore((state) => state.setSelectedPlaylist);
    const setModalMessage = useStore((state) => state.setModalMessage)

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

    return (
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
                            <div className="flex items-center">
                                <img
                                    src={item.images[item.images.length - 1].url}
                                    alt="playlist thumbnail"
                                    height={item.images[item.images.length - 1].height}
                                    width={item.images[item.images.length - 1].width}
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
    )
}
