import { useEffect } from "react";

export default function Test() {
   
  const  initFunction =()=>{
    const progressbar = document.getElementById("progressbar") as HTMLDivElement;
    const segmentTrack = [
        {startTime : 0 ,endTime : 50  , message : 'Segment - 0'},
        {startTime : 50 ,endTime : 100  , message : 'Segment - 1'},
        {startTime : 100 ,endTime : 150 , message : 'Segment - 2'},
        {startTime : 150 ,endTime : 200 , message : 'Segment - 3'},
        {startTime : 200 ,endTime : 205 , message : 'Segment - 4'},
      ]

      const videoDuration = 216;
      segmentTrack.forEach((eachSegment:any,index:any) => {
        const chapter = document.createElement("div");
        chapter.setAttribute("id",`chapter-${index}`);
        chapter.className = `bg-red-${100*(index+1)} absolute self-center  h-[130%] opacity-0 hover:opacity-100  translate-y-[-10%]`
        chapter.style.left = ((eachSegment.startTime/ videoDuration ) * 100) + '%'
        chapter.style.width = (((eachSegment.endTime - eachSegment.startTime)/videoDuration)*100) + '%'
        progressbar.appendChild(chapter); 
      });
  }
    useEffect(()=>{
        
        initFunction()


        return  ()=>{
            const progressbar = document.getElementById("progressbar") as HTMLDivElement;
            progressbar.remove();


            const progressBarContainer = document.createElement("div");
            progressBarContainer.className = "w-full bg-gray-800 h-11 rounded-sm relative";
            progressBarContainer.id = "progressbar";
            progressBarContainer.setAttribute("role", "slider");

            const parent = document.getElementById("parent") as HTMLDivElement;
            parent.appendChild(progressBarContainer);
        }
 
    },[])


  return (
    <div className="p-5" id="parent">
        <div role="slider" className="w-full bg-gray-800 h-11 rounded-sm relative" id="progressbar"></div>
        const videoTag = player.$('.vjs-tech') as HTMLElement;
      const trackElement = document.createElement('track');
      trackElement.setAttribute('kind', 'chapters');
      trackElement.setAttribute('src', 'chapter.vtt');
      trackElement.setAttribute('srclang', 'en');
      trackElement.setAttribute('label', 'Chapters');
      videoTag.appendChild(trackElement);
    </div>
  )
}

