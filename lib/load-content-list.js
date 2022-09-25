import fetch from '../utils/fetcher';

export async function loadContentList(params) {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/lists/${params.listName}`,
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