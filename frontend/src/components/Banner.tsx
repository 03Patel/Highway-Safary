import React from 'react'
import image from "../assets/image.png"
import Footer from "./Footer"
import AboutSection from './AboutSectioin'
import Reviews from '../pages/Reviews'
//import TravelHeroAnimation from './TravelHeroAnimation'


function Banner() {
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row bg-white'>
                <div className='w-full md:w-1/2 mt-32 order-2 md:order-1' >
                    <div className='space-y-12 '>
                        <div className="space-y-8 max-w-xl">
                            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                                What Next?
                            </p>

                            <h1 className="text-3xl md:text-5xl  font-bold leading-tight text-black">
                                Discover Your Next <span className="text-primary">Adventure</span>
                            </h1>

                            <p className="text-md md:text-lg text-gray-700">
                                Explore breathtaking destinations, unforgettable experiences, and
                                exciting journeys waiting just for you. Start your adventure and
                                create memories that last a lifetime.
                            </p>

                            <div className="flex text-sm md:text-base gap-4">
                                <button className="btn btn-primary">
                                    Explore Tours
                                </button>

                                <button className="btn btn-outline btn-primary text-sm md:text-base">
                                    Learn More
                                </button>
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full  mt-20 order-1 md:w-1/2 flex justify-center items-center overflow-hidden">
                    <img
                        src={image}
                        alt="Traveler"
                        className="w-[420px] md:w-[600px] animate-walk"
                    />
                </div>
            </div>

            <AboutSection />

            <Reviews />
            <Footer />
        </>

    )
}

export default Banner