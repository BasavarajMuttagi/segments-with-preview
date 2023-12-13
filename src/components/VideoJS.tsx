import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
export const VideoJS = ( {options, onReady}:any) => {
  const videoRef = useRef<any>(null);
  const playerRef = React.useRef<any>(null);

  const segmentTrack = [
    {startTime : 0 ,endTime : 50  , message : 'Segment - 1'},
    {startTime : 50 ,endTime : 100  , message : 'Segment - 2'},
    {startTime : 100 ,endTime : 150 , message : 'Segment - 3'},
    {startTime : 150 ,endTime : 200 , message : 'Segment - 4'},
    {startTime : 200 ,endTime : 205 , message : 'Segment - 5'},
  ]


  useEffect(() => {


    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
                player.eme();
                player.src({
                    src: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
                    type: 'application/dash+xml',                    
                    keySystems: {
                      'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',                     
                    }

                    // src : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                });

                


        onReady && onReady(player);
      });


      const progressBar =  document.querySelector('div[aria-label="Progress Bar"]') as HTMLDivElement;;
      player.on('loadedmetadata',()=>{

        const videoTag = player.$('.vjs-tech') as HTMLElement;
        const trackElement = document.createElement('track');
        trackElement.setAttribute('kind', 'chapters');
        trackElement.setAttribute('src', 'chapter.vtt');
        trackElement.setAttribute('srclang', 'en');
        trackElement.setAttribute('label', 'Chapters');
        videoTag.appendChild(trackElement);

        const videoDuration = Math.ceil(player.duration() as number);

        segmentTrack.forEach((eachSegment:any,index:any) => {

          const chapter = document.createElement("div");
          const segment = document.createElement("div");

          chapter.setAttribute("id",`chapter-${index}`);
          chapter.className = `absolute h-[200%] opacity-0  hover:opacity-100 hover:translate-y-[-25%] hover:bg-red-600 hover:h-[300%] hover:ease-out focus:pointer-events-auto`
          chapter.style.left = ((eachSegment.startTime/ videoDuration ) * 100) + '%'
          chapter.style.width = (((eachSegment.endTime - eachSegment.startTime)/videoDuration) * 100) + '%'
          chapter.setAttribute("data-tooltip-id","my-tooltip");
          chapter.setAttribute("data-tooltip-content",eachSegment.message)
          chapter.setAttribute("data-tooltip-offset",'50')


          segment.className = `bg-yellow-400 absolute`
          segment.style.left = ((eachSegment.startTime/ videoDuration ) * 100) + '%'
          segment.style.width ="4px"
          segment.style.height = "100%"

          
          progressBar.appendChild(segment);
          progressBar.appendChild(chapter); 
        });
      })

    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);



  return (
    <div data-vjs-player>
      <div ref={videoRef} >
      </div>
      <Tooltip id='my-tooltip' />
    </div>
  );
}

export default VideoJS;

