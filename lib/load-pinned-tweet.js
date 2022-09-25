import fetch from '../utils/fetcher';

export async function loadPinnedTweet() {

    const tweets = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`,
    {
      method: "GET",
      headers: {
        // update with your user-agent
        "User-Agent": "*", 
        Accept: "application/json; charset=UTF-8",
      }
    }
  );

  return tweets

}