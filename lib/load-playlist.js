import fetch from '../utils/fetcher';

export async function loadPlaylist() {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/bnb`,
    {
      method: "GET",
      headers: {
        // update with your user-agent
        "User-Agent": "*", 
        Accept: "application/json; charset=UTF-8",
      }
    }
  );

  return data

}