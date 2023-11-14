import Spotify from "spotify-web-api-node";

const spotify = new Spotify();
spotify.setRefreshToken(process.env.REFRESH_TOKEN!);
spotify.setClientId(process.env.CLIENT_ID!);
spotify.setClientSecret(process.env.CLIENT_SECRET!);

export default function Home() {
  spotify.refreshAccessToken().then((data) => {
    spotify.setAccessToken(data.body.access_token);
  });

  async function add(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const artist = formData.get("artist");

    const trackRes = await spotify.searchTracks(
      `track:${name} artist:${artist}`,
    );
    const uri = JSON.stringify(trackRes.body.tracks?.items[0].uri);
    if (process.env.DENY_EXPLICIT === "true") {
      if (trackRes.body.tracks?.items[0].explicit) {
        return;
      }
    }

    const id = uri.split(/[:\"]+/)[3];

    const addRes = await fetch(
      `https://api.spotify.com/v1/playlists/${process.env.NEXT_PUBLIC_PLAYLIST_ID}/tracks?uris=spotify%3Atrack%3A${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${spotify.getAccessToken()}`,
        },
      },
    );

    console.log(await addRes.json());
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-16 bg-green-300 p-4 md:p-10">
      <h1 className="rounded-2xl border-4 border-black bg-blue-400 p-5 text-center text-4xl font-semibold text-white shadow-black drop-shadow-xl">
        Gaither Hack Club - Spotify Playlist
      </h1>
      <div className="flex flex-col items-center justify-start gap-4 rounded-xl bg-green-400 p-8">
        <h2 className="text-3xl font-medium">Add a Song</h2>
        <form
          action={add}
          className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-end"
        >
          <div className="flex flex-col items-start justify-start">
            <label className="text-lg">Name</label>
            <input
              name="name"
              type="text"
              className="flex rounded-md border-2 border-black p-3 text-lg text-black"
              placeholder="Never Gonna Give You Up"
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <label className="text-lg">Artist</label>
            <input
              name="artist"
              type="text"
              className="flex rounded-md border-2 border-black p-3 text-lg text-black"
              placeholder="Rick Astley"
            />
          </div>
          <button
            type="submit"
            className="flex aspect-square items-center rounded-lg bg-green-500 p-4 text-center text-xl font-medium"
          >
            Add
          </button>
        </form>
      </div>
      <iframe
        className="h-96 w-full rounded-md md:w-1/2"
        src={`https://open.spotify.com/embed/playlist/${process.env.NEXT_PUBLIC_PLAYLIST_ID}`}
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </main>
  );
}
