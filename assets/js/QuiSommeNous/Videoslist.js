import React from 'react'
import ReactPlayer from 'react-player'


function VideosList() {
    // const externalSource='';
    return (
        <div className="ved ">
            <div className="videosGaea2 ">
                {/*<ReactPlayer url={externalSource}/>*/}
                <ReactPlayer width="40%" url=' https://youtu.be/oHlaJbcg_Uo '/>
                <ReactPlayer width="40%" url='https://youtu.be/SSyLFpEa0aE ' />
                <ReactPlayer width="40%" url=' https://youtu.be/JUVoPYxkwpg'/>



            </div>

        </div>
    )

}

export default VideosList