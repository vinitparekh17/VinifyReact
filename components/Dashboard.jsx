import { useState, useEffect } from "react"
import Head from "next/head"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import "bootstrap/dist/css/bootstrap.min.css";
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
})

export default function Dashboard({ code }) {
const accessToken = useAuth(code);
const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [playingTrack, setPlayingTrack] = useState();
const [lyrics, setLyrics] = useState("");

function chooseTrack(track) {
  setPlayingTrack(track);
  setSearch("");
  setLyrics("");
}

useEffect(() => {
  if (!playingTrack) return;

  axios
    .get("http://localhost:3001/lyrics", {
      params: {
        track: playingTrack.title,
        artist: playingTrack.artist,
      },
    })
    .then((res) => {
      setLyrics(res.data.lyrics);
    });
}, [playingTrack]);

useEffect(() => {
  if (!accessToken) return;
  spotifyApi.setAccessToken(accessToken);
}, [accessToken]);

useEffect(() => {
  if (!search) return setSearchResults([]);
  if (!accessToken) return;

  let cancel = false;
  spotifyApi.searchTracks(search).then(res => {
    if (cancel) return;
    setSearchResults(
      res.body.tracks.items.map((track) => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
        };
      })
    );
  });

  return () => (cancel = true);
}, [search, accessToken]);

  // const showResult = (e) => {
  //   console.log(searchResults.length)
  //   if (!search) return setSearchResults([])
  //   if (!accessToken) return
  //   spotifyApi.searchTracks(search).then((res) => {
  //     setSearchResults(
  //       res.body.tracks.items.map((track) => {
  //         const smallestAlbumImage = track.album.images.reduce(
  //           (smallest, image) => {
  //             if (image.height < smallest.height) return image;
  //             return smallest;
  //           },
  //           track.album.images[0]
  //         );

  //         return {
  //           artist: track.artists[0].name,
  //           title: track.name,
  //           uri: track.uri,
  //           albumUrl: smallestAlbumImage.url,
  //         };
  //       })
  //     );
  //   });
  // }

  return (
    <>
    <Head>
      <title>Vinify | Non Stop Music</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Vinify, A Spotify Clone that gives premium experience." />
      <meta name="keywords" content="Vinify, Non Stop Music" />
      <link rel="icon" href="/vinify.png" />
    </Head>
      <div className="d-flex flex-column m-0 aqua" style={{ height: "100vh" }}>
        <section>
          <nav
            className="navbar navbar-dark"
            style={{ backgroundColor: "#000957" }}
          >
            <div className="container-fluid">
              <a className="navbar-brand">
                <img
                  src={'/vinify.png'}
                  alt=""
                  width="27"
                  height="27"
                  style={{
                    border: "1px solid #fff",
                    borderRadius: "50%",
                    background: "#000",
                  }}
                  className="d-inline-block align-text-top"
                />{" "}
                <strong>Vinify</strong>
              </a>
              <div className="d-flex">
                <input
                  className="form-control"
                  style={{
                    marginRight: ".4rem",
                  }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary">
                  Search
                </button>
                </div>
            </div>
          </nav>
        </section>
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
          {searchResults.length == 0 ? (
            <div
              className="text-center"
              style={{
                color: "#fff",
                width: "100%",
                fontSize: "1rem",
                fontWeight: "600",
                whiteSpace: "pre",
                backdropFilter: 'blur(20px)',
                textShadow: "1px 1px 1px #000",
              }}
            >
              {lyrics}
            </div>
          ) : null}
        </div>
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </>
  );
}
