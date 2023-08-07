'use client'

import { gapi } from 'gapi-script';

export default function YTLogin() {

  function loadClient() {
    gapi.client.setApiKey(process.env.NEXT_PUBLIC_YT_api_key as string);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(function () { console.log("GAPI client loaded for API"); },
        function (err: any) { console.error("Error loading GAPI client for API", err); });
  }

  function authenticate(e: React.FormEvent) {
    e.preventDefault()
    return gapi.auth.signIn({
      clientid: process.env.NEXT_PUBLIC_YT_client_id,
      scope: "https://www.googleapis.com/auth/youtube.force-ssl"
    })
  }



  return (
    <div className="min-w-[250px] h-[100vh] w-full m-auto flex items-center justify-center">
      <form>
        <label className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl font-bold text-white">
            Log into your youtube music account
          </span>
          <button
            onClick={(e) => authenticate(e)}
            title="login"
            type="submit"
            id='customBtn'
            className="px-8 py-2 text-white text-lg font-medium bg-[#c3352e] hover:opacity-85 duration-300 transition-all rounded-2xl max-w-[10rem] mx-auto"
          >
            Login
          </button>


        </label>
      </form>
    </div>
  );
}
