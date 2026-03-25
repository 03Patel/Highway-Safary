import React, { lazy, Suspense, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Lazy load components
const Footer = lazy(() => import("./Footer"))
const AboutSection = lazy(() => import('./AboutSectioin'))
const Reviews = lazy(() => import('../pages/Reviews'))
const TopTour = lazy(() => import('../pages/TopTour'))
const TravelHero = lazy(() => import('./MobileFrame'))

function Banner() {


    const navigate = useNavigate()


    // ✅ useCallback to prevent re-creation on every render
    const handleClick = useCallback(() => {
        console.log("click")
    }, [])

    return (
        <>
            {/* HERO SECTION */}
            <div className='max-w-screen-2xl md:min-h-screen h-[50vh] container mx-auto md:px-20 px-4 flex flex-col md:flex-row bg-pink-50'>

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
                                Explore breathtaking destinations, unforgettable experiences, and exciting journeys waiting just for you. Start your adventure and create memories that last a lifetime.
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">

                                {/* ✅ No extra button inside Link */}
                                <Link
                                    to="/destination"
                                    onClick={() => navigate("/destination")}
                                    className="btn btn-primary"
                                >
                                    Explore Tours
                                </Link>

                                <button onClick={() => navigate("/signup")} className="btn btn-outline hidden md:block btn-primary">
                                    Get Started
                                </button>
                                <br />
                                <br />

                            </div>

                        </div>
                    </div>
                    <br />
                    <br />
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full hidden md:block mt-[-40px] md:mt-[-30px] order-2 md:w-1/2 flex justify-center items-center overflow-hidden">
                    <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading...</div>}>
                        <TravelHero />
                    </Suspense>
                </div>

            </div>

            {/* BELOW SECTIONS (Better split loading) */}
            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                <AboutSection />
            </Suspense>

            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                <TopTour />
            </Suspense>

            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                <Reviews />
            </Suspense>

            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                <Footer />
            </Suspense>
        </>
    )
}

export default React.memo(Banner)