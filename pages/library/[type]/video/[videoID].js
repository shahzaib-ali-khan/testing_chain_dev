import fetcher from "../../../../utils/fetcher";
import { Container } from "../../../../components/layout";
import dynamic from "next/dynamic";
import { loadVideo } from "../../../../lib/load-video";

const Player = dynamic(() => import("../../../../components/videos/player"));

export async function getStaticPaths() {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/bnb`
  );

  // Fetch playlist content
  let contentList = [];
  for await (let playlist of data) {
    const content = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${playlist.Vertical}/${playlist._id}`
    );

    contentList.push(content);
  }

  // contentList was an array of arrays
  contentList = contentList.flat();

  const paths = contentList.map((content) => {
    return {
      params: {
        type: content.PlaylistID,
        videoID: content.SK,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  
  const data = await loadVideo(params)

  return {
    props: { data },
    revalidate: 300,
  };
}

function VideoID({ data }) {
  const metaTags = {
    title: data.Title,
    description: data.Description,
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/${data.PlaylistID}/video/${data.SK}`,
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <Player content={data} />
    </Container>
  );
}

export default VideoID;
