'use client'

// code verifier
function generateRandomString(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// code challenge
// @ts-ignore
async function generateCodeChallenge(codeVerifier) {
  // @ts-ignore
  function base64encode(string) {
    // @ts-ignore
    return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);

  return base64encode(digest);
}

export default function Login() {
  const handleLogin = () => {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      let state = generateRandomString(16);
      let scope = "user-read-private user-read-email";

      localStorage.setItem("code_verifier", codeVerifier);

      let args = new URLSearchParams({
        response_type: "code",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        scope: scope,
        redirect_uri: process.env.NEXT_PUBLIC_redirect_uri as string,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
      });

      window.location.href = "https://accounts.spotify.com/authorize?" + args;
    });

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    localStorage.setItem('code', code as string)
  };

  return (
    <div className="min-w-[250px] h-[100vh] w-full m-auto flex items-center justify-center">
      <form action={handleLogin}>
        <label className="flex flex-col gap-4">
          <span className="text-xl font-bold text-white">
            Log into your spotify account
          </span>
          <button
            title="login"
            type="submit"
            className="px-8 py-2 text-white text-lg font-medium bg-green-600 hover:opacity-85 duration-300 transition-all rounded-2xl max-w-[10rem] mx-auto"
          >
            Login
          </button>
        </label>
      </form>
    </div>
  );
}
