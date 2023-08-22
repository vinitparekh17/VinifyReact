import React from "react";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <>
      <div
        className="d-flex align-items-center m-3 p-3"
        style={{
          background: "#ffffff77",
          border: "1px solid #fff",
          cursor: "pointer",
          borderRadius: "20px",
        }}
        onClick={handlePlay}
      >
        <img
          src={track.albumUrl}
          alt="img"
          style={{
            height: "64px",
            width: "64px",
            borderRadius: "15px",
            boxShadow: "0 0 5px #111",
          }}
        />
        <div style={{marginLeft: ".5rem"}}>
          <div className="h4">{track.title}</div>
          <div className="ms-1" style={{ color: "#655565" }}>
            {track.artist}
          </div>
        </div>
      </div>
    </>
  );
}
