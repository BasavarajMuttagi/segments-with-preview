// import './App.css'
import  { useRef } from 'react';
import VideoJS from './components/VideoJS';
import videojs from 'video.js';


const App = () => {
  const playerRef = useRef(null);

  const videoJsOptions =       {
    controls: true,
    fluid: true,
    html5: {
        vhs: { 
            overrideNative: true 
        }
    }
}

  const handlePlayerReady = (player:any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
}


export default App;