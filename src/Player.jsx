import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      styles={{
        activeColor: "#000957",
        bgColor: "#ffffff90",
        color: "#000957",
        loaderColor: "#000957",
        sliderColor: "#00FFDD",
        trackArtistColor: "#000",
        trackNameColor: "#000957",
      }}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
