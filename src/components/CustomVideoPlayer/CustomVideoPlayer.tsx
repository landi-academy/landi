'use client';
import Image from 'next/image';
// components/VideoFrame.tsx
import React, { useState } from 'react';

interface VideoFrameProps {
  videoUrl: string;
  splashUrl: string;
}

const CustomVideoPlayer: React.FC<VideoFrameProps> = ({ videoUrl, splashUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSplashClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-container" onClick={handleSplashClick}>
      {!isPlaying ? (
        <Image src={splashUrl} alt="Click to play" className="video-splash" layout="fill" objectFit="cover" />
      ) : (
        <iframe
          src={videoUrl}
          allow="autoplay"
          allowFullScreen
          className="responsive-iframe"
        ></iframe>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
