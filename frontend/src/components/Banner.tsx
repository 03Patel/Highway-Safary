import React from 'react'
import image from "../assets/image.png"
import Footer from "./Footer"
import AboutSection from './AboutSectioin'
import Reviews from '../pages/Reviews'
import TopTour from '../pages/TopTour'
import TravelHero from './MobileFrame'
//import TravelHeroAnimation from './TravelHeroAnimation'


function Banner() {
    return (
        <>
            <div className='max-w-screen-2xl h-screen container mx-auto md:px-20 px-4 flex flex-col md:flex-row bg-pink-50'>
                <div>
                    <p></p>
                </div>
                {/* LEFT CONTENT */}
                <div className='w-full md:w-1/2 mt-12 md:mt-20 order-1 flex justify-center md:justify-start'>

                    <div className='space-y-12 text-center md:text-left'>
                        <div className="space-y-6 max-w-xl mx-auto md:mx-0">

                            <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                                What Next?
                            </p>

                            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-black">
                                Discover Your Next <span className="text-primary">Adventure</span>
                            </h1>

                            <p className="text-sm md:text-lg text-gray-700">
                                Explore breathtaking destinations, unforgettable experiences, and
                                exciting journeys waiting just for you. Start your adventure and
                                create memories that last a lifetime.
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                                <button className="btn btn-primary w-auto md:w-auto">
                                    Explore Tours
                                </button>

                                <button className="btn btn-outline hidden md:block btn-primary w-full sm:w-auto">
                                    Learn More
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full mt-[-50px] md:mt-[-30px] order-2 md:w-1/2 flex justify-center items-center overflow-hidden">
                    <TravelHero />
                </div>

            </div>

            <AboutSection />
            <TopTour />
            <Reviews />

            <Footer />
        </>

    )
}

export default Banner