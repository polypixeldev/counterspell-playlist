import Spotify from "spotify-web-api-node";

const spotify = new Spotify();
spotify.setRefreshToken(process.env.REFRESH_TOKEN!);
spotify.setClientId(process.env.CLIENT_ID!);
spotify.setClientSecret(process.env.CLIENT_SECRET!);

export async function POST(request: Request) {
  const refreshData = await spotify.refreshAccessToken();
  spotify.setAccessToken(refreshData.body.access_token);

  const formData = await request.json();
  const name = formData.name;
  const artist = formData.artist;

  const trackRes = await spotify.searchTracks(`track:${name} artist:${artist}`);
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

  console.log(addRes.status);

  if (addRes.status >= 200 && addRes.status <= 299) {
    return Response.json({ status: "ok" });
  } else {
    return Response.json({ status: "error" });
  }
}
