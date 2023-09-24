import Link from "next/link";

export default function GeneratePlayListBtn() {
    return (
        <div className="flex justify-center items-center gap-4 mt-4">
            <button
                title="generate playlist"
                type="button"
                className="px-8 py-2 text-white text-lg font-medium bg-[#f94c57] hover:bg-opacity-85 duration-300 transition-all rounded-2xl"
            >
                <Link href={"/auth/apple"}>Generate Apple Playlist</Link>
            </button>
            <button
                title="generate playlist"
                type="button"
                className="px-8 py-2 text-white text-lg font-medium bg-[#c3352e] hover:bg-opacity-85 duration-300 transition-all rounded-2xl"
            >
                <Link href={"/auth/youtube"}>
                    Generate Youtube Music Playlist
                </Link>
            </button>
        </div>
    )
}
