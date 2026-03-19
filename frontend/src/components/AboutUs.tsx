import React from 'react'
import Footer from './Footer'
import Heading from './Heading'

function AboutUs() {
    return (
        <div>
            <Heading />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    About Highway safary Family
                </h1>

                <p className="max-w-2xl text-sm md:text-lg mb-6">
                    Where you discover amazing places, unique experiences, and unforgettable journeys.
                </p>



            </div>

            <section className="px-6 md:px-16 py-16 bg-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    {/* Left Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Highway Safary
                        </h2>

                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            Highway Safary is more than just a travel platform — it's your partner in discovering unforgettable journeys. We help travelers explore destinations with ease, comfort, and confidence.
                        </p>

                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            From scenic road trips to carefully curated travel experiences, we focus on making every journey smooth and memorable. Whether you're planning a weekend getaway or a long adventure, we’ve got you covered.
                        </p>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our mission is simple — to make travel accessible, enjoyable, and stress-free for everyone.
                        </p>
                    </div>

                    {/* Right Image */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                            alt="Travel"
                            className="w-full h-[400px] object-cover rounded-2xl shadow-md"
                        />
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default AboutUs