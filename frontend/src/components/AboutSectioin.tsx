import background from "../assets/Background2.jpg";
import gi from "../assets/Untitled.png";

export default function AboutSection() {
    return (
        <section className="w-full py-12 md:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-12">

                {/* Left Image */}
                <div className="w-full md:w-1/2 order-2 flex justify-center items-center relative overflow-hidden rounded-2xl h-64 sm:h-80 md:h-96">

                    {/* Background Image */}
                    <img
                        src={background}
                        alt="Background"
                        loading="lazy"   // ✅ lazy load
                        className="w-full h-full object-cover scale-125 md:scale-150 origin-bottom"
                    />

                    {/* Foreground Image */}
                    <img
                        src={gi}
                        alt="Foreground"
                        loading="lazy"   // ✅ lazy load
                        className="absolute inset-0 w-full h-full object-contain object-left animate-float"
                    />
                </div>

                {/* Right Content */}
                <div className="w-full md:w-1/2 order-1 space-y-5 text-center md:text-left">

                    <p className="text-primary italic text-base md:text-lg">
                        About Highway Safary
                    </p>

                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-black">
                        World Best <span className="text-primary">Travel</span> Agency
                    </h1>

                    <p className="text-sm md:text-lg text-gray-700">
                        Since 2025, we’ve been helping travelers explore breathtaking destinations.
                        From day trips to longer vacations, we make sure every journey is enjoyable
                        and unforgettable.
                    </p>

                    {/* Features */}
                    <div className="space-y-3 pt-2">
                        {FEATURES.map((item, i) => (
                            <div key={i} className="flex items-center justify-center md:justify-start gap-3">
                                <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">
                                    ✓
                                </div>
                                <p className="text-black text-sm md:text-base">{item}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

// ✅ move outside component (prevents recreation on every render)
const FEATURES = [
    "Best travel destinations",
    "Affordable packages",
    "24/7 travel support"
];