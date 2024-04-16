'use client';
'use client';
import React, { useState, useRef } from 'react';
import styles from './CustomVideoPlayer.module.scss';

interface CustomVideoPlayerProps {
  videoUrl: string;
  splashImageUrl?: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ videoUrl, splashImageUrl }) => {
  const [showSplash, setShowSplash] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleVideoStart = () => {
    setShowSplash(false); // Hide splash screen
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  };

  return (
    <div className={styles.videoContainer}>
      {showSplash && (
        <div className={styles.splashScreen} onClick={handleVideoStart}>
          <img src={splashImageUrl} alt="Click to play video" className={styles.splashImage} />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`${videoUrl}?enablejsapi=1`} // Enable JS API for iframe control
        allow="autoplay"
        allowFullScreen
        className={`responsive-iframe ${styles.iframe}`}
      ></iframe>
    </div>
  );
};

export default CustomVideoPlayer;
