export default function Navbar({
  name,
  handleLogOut,
}: {
  name: string;
  handleLogOut: () => void;
}) {
  return (
    <nav className="w-full">
      <div className="flex justify-between items-center py-[2rem] px-[5%]">
        <h1 className="text-xl font-semibold">hey {name}</h1>
        <button
          onClick={handleLogOut}
          title="logout"
          type="submit"
          className="px-8 py-2 text-white text-lg font-medium bg-green-600 hover:opacity-85 duration-300 transition-all rounded-2xl max-w-[10rem]"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
