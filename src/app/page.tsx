"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [status, setStatus] = useState<string>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-4 md:p-10">
      <div className="bg-sky absolute left-0 top-0 -z-50 h-full w-screen" />
      <h1 className="bg-board text-pink font-display rounded-2xl border-4 border-black p-5 text-center text-4xl font-semibold shadow-black drop-shadow-xl">
        Counterspell Playlist
      </h1>
      <div className="bg-board flex flex-col items-center justify-start gap-4 rounded-xl border-2 border-black p-8 text-white">
        <h2 className="text-pink font-display text-4xl font-medium">
          Add a Song
        </h2>
        <form className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col items-start justify-start">
            <label className="text-lg">Name</label>
            <input
              name="name"
              type="text"
              className="flex rounded-md border-2 border-black p-3 text-lg text-black"
              placeholder="Never Gonna Give You Up"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label className="text-lg">Artist</label>
            <input
              name="artist"
              type="text"
              className="flex rounded-md border-2 border-black p-3 text-lg text-black"
              placeholder="Rick Astley"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-blue font-display flex aspect-square items-center rounded-lg p-4 text-center text-2xl font-medium"
            onClick={async () => {
              try {
                const res = await fetch("/add", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    artist,
                  }),
                });

                const json = await res.json();

                setStatus(json.status);
              } catch {
                setStatus("error");
              }
            }}
          >
            Add
          </button>
        </form>
        {status === "ok" ? (
          <p className="text-bold w-full rounded-md bg-green-500 p-4 text-center text-xl">
            Added song!
          </p>
        ) : status === "error" ? (
          <p className="text-bold w-full rounded-md bg-red-500 p-4 text-center text-xl">
            Error adding song, try again
          </p>
        ) : status === "explicit" ? (
          <p className="text-bold w-full rounded-md bg-red-500 p-4 text-center text-xl">
            Song is explicit, try again
          </p>
        ) : null}
      </div>
      <iframe
        className="z-10 h-96 w-full rounded-md md:w-1/2"
        src={`https://open.spotify.com/embed/playlist/${process.env.NEXT_PUBLIC_PLAYLIST_ID}`}
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      <div className="absolute top-0 -z-10 h-full w-screen">
        <img
          className="absolute bottom-0 -z-10 w-screen bg-no-repeat"
          src="/bg/bg1.png"
          alt=""
        />
        <img
          className="absolute bottom-0 -z-20 w-screen"
          src="/bg/bg2.png"
          alt=""
        />
        <img
          className="absolute bottom-0 -z-30 w-screen"
          src="/bg/bg3.png"
          alt=""
        />
        <img
          className="absolute bottom-0 -z-40 w-screen"
          src="/bg/bg4.png"
          alt=""
        />
      </div>
    </main>
  );
}
