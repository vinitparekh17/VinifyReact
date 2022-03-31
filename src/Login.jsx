import React from "react";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=dea12af6833d4125ae9ecb7aa8d89144&response_type=code&redirect_uri=https://www.vinify.vinitparekh.rocks&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div className="bg">
      <center>
        <h1 className="h1">Welcome to Vinify</h1>
        <a className="btn btn-info btn-lg" href={AUTH_URL} role="button">
          <i className="fa-brands fa-spotify"></i> Login with Spotify
        </a>
      </center>
    </div>
  );
}
