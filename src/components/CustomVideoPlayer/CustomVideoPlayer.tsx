'use client';
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const CustomVideoPlayer = ({ videoUrl }: any) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        ref={playerRef}
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
      />
      <button onClick={handlePlayPause}>
        {playing ? 'Пауза' : 'Играть'}
      </button>
    </div>
  );
};

export default CustomVideoPlayer;
