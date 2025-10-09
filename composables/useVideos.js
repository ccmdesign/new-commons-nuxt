export const videos = [
  {
    src: "/assets/videos/vídeo 2'58'' CERTI Amazonia.mp4",
    slug: "amazon-rainforest-evolution-index",
  },
  {
    src: "/assets/videos/Copy of Malawi Data Commons Video.mp4",
    slug: "malawi-voice-data-commons",
  },
  {
    src: "/assets/videos/New Commons Challenge video pitch - Global Strategic Litigation Council (720p, h264, youtube).mp4",
    slug: "advancing-climate-justice-the-climate-mobility-case-database",
  },
  {
    src: "/assets/videos/PLACE 3 min video - PLACE (360p, h264, youtube).mp4",
    slug: "place-hub-in-nigeria",
  },
  {
    src: "https://player.vimeo.com/video/1101399375?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    slug: "know-your-city-academy",
  },
  {
    src: "/assets/videos/video-NewsCommonsChallege-semlogo-100mb.mp4",
    slug: "querido-diario",
  },
];

export default function useVideos(slug) {
  return videos.find(video => video.slug === slug);
}