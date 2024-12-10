import { useState } from 'react';
import ReactPlayer from 'react-player';
import video from "../../assets/AboutVideo.mp4";
//import videoThumbnail from "../../assets/video-thumbnail.jpg"; // Video thumbnail'inizi import edin

const AboutVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setShowPlayButton(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
  };

  return (
    <section className="w-[85%] mx-auto py-16">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
        <ReactPlayer
          url={video}
          playing={isPlaying}
          width="100%"
          height="100%"
          controls={true}
          //light={videoThumbnail} // Thumbnail'i buraya ekleyin
          onPause={handlePause}
          onEnded={() => {
            setIsPlaying(false);
            setShowPlayButton(true);
          }}
        />
        
        {/* Play Button - Video duraklatıldığında veya bittiğinde görünür */}
        {showPlayButton && (
          <button
            onClick={handlePlayClick}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center
              hover:bg-blue-600 transition-colors duration-300 group z-10"
          >
            <div className="w-0 h-0 border-t-[15px] border-t-transparent 
              border-l-[25px] border-l-white border-b-[15px] border-b-transparent
              ml-2 group-hover:scale-110 transition-transform duration-300" />
          </button>
        )}
      </div>
    </section>
  );
};

export default AboutVideo;