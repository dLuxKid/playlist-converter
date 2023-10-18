export default function AppleLogin() {
  return (
    <div className="min-w-[250px] h-[100vh] w-full m-auto flex items-center justify-center">
      <form>
        <label className="flex flex-col gap-4 text-white">
          <span className="text-xl font-bold">
            Log into your apple music account
          </span>
          <button
            // onClick={handleLogin}
            title="login"
            type="submit"
            className="px-8 py-2 text-white text-lg font-medium bg-[#f94c57] hover:opacity-85 duration-300 transition-all rounded-2xl max-w-[10rem] mx-auto"
          >
            Login
          </button>
        </label>
      </form>
    </div>
  );
}
