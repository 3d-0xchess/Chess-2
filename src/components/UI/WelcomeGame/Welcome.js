import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

import './Welcome.scss'; // Import the SCSS file
import video from "../../../assets/video/pixie-chess.webm"

const WelcomeVideoPage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
    navigate('/games');
  };

  const handleSkip = () => {
    setShowVideo(false);
    navigate('/games');
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  if (!showVideo) {
    return null;
  }

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={video}
        autoPlay
        controls={false}
        muted={isMuted}
        onEnded={handleVideoEnd}
        className="video-element"
      />
      <button className="mute-button" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? <FaVolumeUp size={24} color='white'/> : <FaVolumeMute size={24} color='white'/>}
      </button>
      <button className="skip-button" onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
};

export default WelcomeVideoPage;