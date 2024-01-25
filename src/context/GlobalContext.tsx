"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const GlobalContext = createContext<any>({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPlaylists, setUserPlaylists] = useState<any>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>();

  const [error, setError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    let codeVerifier = localStorage.getItem("code_verifier");
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (!codeVerifier || !code) return router.push("/auth/spotify");

    let body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: process.env.NEXT_PUBLIC_redirect_uri as string,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      code_verifier: codeVerifier,
    });

    axios
      .post("https://accounts.spotify.com/api/token", body, {
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
        toast.error(error.message);
      });

    (async function getProfile() {
      let accessToken = localStorage.getItem("access_token");

      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.status !== 200) {
        setError("Error fetching profile details");
        toast.error("Error fetching profile details");
        throw new Error("Network response was not ok");
      }

      setUserProfile(response.data);
      toast.success("Login successfull");
    })();
  }, [router]);

  if (error && !userProfile) {
    router.refresh();
    return (
      <div className="min-h-screen w-screen flex items-center justify-center">
        <span className="text-lg text-red-700 font-medium">
          {error}, refresh page or login
        </span>
      </div>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        userProfile,
        userPlaylists,
        setUserPlaylists,
        setUserProfile,
        selectedPlaylist,
        setSelectedPlaylist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
export const useGlobalContext = () => useContext(GlobalContext);
