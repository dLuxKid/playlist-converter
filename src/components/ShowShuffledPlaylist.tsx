"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import SongList from "./SongList";
import { useState } from "react";

export default function ShowShuffledPlaylist() {
  const { shuffledPlaylist, setShuffledPlaylist } = useGlobalContext();
  const [showShuffledPlaylist, setShowShuffledPlaylist] =
    useState<boolean>(false);

  if (!shuffledPlaylist) return null;
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-slate-200 font-bold">
          Here is your shuffled playlist below
        </h1>

        <div className="flex gap-2 items-center">
          <span
            className="h-8 w-8 rounded-full cursor-pointer bg-red-600 text-white flex items-center justify-center text-base font-bold"
            onClick={() => setShuffledPlaylist(null)}
          >
            X
          </span>
          <span
            onClick={() => setShowShuffledPlaylist((prev) => !prev)}
            className="h-8 w-8 rounded-full cursor-pointer bg-red-600 text-white flex items-center justify-center text-base font-bold"
          >
            v
          </span>
        </div>
      </div>

      {showShuffledPlaylist &&
        shuffledPlaylist.map((item: any, idx: number) => (
          <SongList key={idx} item={item} />
        ))}
    </div>
  );
}
