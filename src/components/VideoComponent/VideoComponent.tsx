type VideoComponentProps = {
  videoUrl: string;
};

const VideoComponent: React.FC<VideoComponentProps> = ({ videoUrl }) => {

  if (!videoUrl) {
    return null;
  }

  return (
    <video width="100%" height="240" controls>
      <source src={videoUrl} type="video/mp4" />
      Twoja przeglądarka nie obsługuje elementu wideo.
    </video>
  );
};

export default VideoComponent;