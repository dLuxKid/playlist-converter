export default function SongList({ item }: any) {
  return (
    <div className="w-full flex flex-wrap items-center justify-start border border-white text-white rounded-2xl p-2">
      {item.track ? (
        <>
          <p className="mr-2">{item.track.name || ""}</p>
          by
          <span className="flex flex-wrap">
            {item.track.artists?.map((i: any, idx: number) => (
              <p key={idx} className="ml-1">
                {i.name} <span className="last:hidden">, </span>
              </p>
            ))}
          </span>
        </>
      ) : (
        <p className="text-red-600">Error with song</p>
      )}
    </div>
  );
}
