import React from 'react'
import background from "../assets/background.jpg"

function Heading() {
    return (
        <>
            <div>
                <div className="h-full w-full relative ">
                    <img src={background} alt="" className="h-[75vh] w-full" />
                    <div className="absolute inset-0 bg-black/50 h-[75vh]"></div>
                </div>

            </div>
        </>
    )
}

export default Heading