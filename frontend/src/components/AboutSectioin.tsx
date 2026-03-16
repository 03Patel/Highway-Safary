import hero from "../assets/image3.jpg"
import background from "../assets/background2.jpg"
import gi from "../assets/Untitled.png"


export default function AboutSection() {
    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Left Image */}
                <div className="w-full md:w-1/2 flex justify-start items-center relative px-4 sm:px-6 overflow-hidden rounded-2xl h-72 sm:h-96">

                    {/* Background Image */}
                    <img
                        src="../assets/background2.jpg"
                        alt="Background"
                        className="absolute top-0 left-0 w-[400%]  object-cover object-left   duration-700 hover:scale-110"
                    />

                    {/* Foreground Image */}
                    <img
                        src={gi}
                        alt="Foreground"
                        className="absolute top-0 left-0 w-[400%] h-full object-cover object-left animate-float"
                    />

                </div>

                {/* Right Content */}
                <div className="w-full md:w-1/2 order-1 md:order-2space-y-6">

                    <p className="text-primary italic text-lg">
                        About Highway Safary
                    </p>
                    <br />
                    <h1 className="text-2xl md:text-5xl font-bold leading-tight text-black ">
                        World Best <span className="text-primary">Travel</span> Agency
                    </h1>
                    <br />
                    <br />
                    <p className="text-md md:text-lg text-gray-700">
                        Since 2025, we’ve been helping travelers explore breathtaking destinations. From day trips to longer vacations, we make sure every journey is enjoyable and unforgettable.
                    </p>
                    <br />
                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">✓</div>
                            <p className="text-black text-sm md:text-base">Best travel destinations</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">✓</div>
                            <p className="text-black text-sm md:text-base">Affordable packages</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">✓</div>
                            <p className="text-black text-sm md:text-base">24/7 travel support</p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
