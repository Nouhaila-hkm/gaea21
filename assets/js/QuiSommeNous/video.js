import React from 'react'
import ReactPlayer from 'react-player'


function Videos() {
    // const internalSource='#url';
    return (
        <div className="ved">
            <div className="videosGaea2 ">

                <ReactPlayer width="40%" url=' https://youtu.be/hvIrE8tgnVk'/>
                {/*<ReactPlayer width="40%" url=' https://youtu.be/1u78LhN9Sbg'/>*/}
                <ReactPlayer width="40%" url=' https://youtu.be/3Zrm1AD-fL0'/>

                <ReactPlayer width="40%" url='https://youtu.be/QOYqIX8PYQc '/>


            </div>

        </div>
    )

}

export default Videos