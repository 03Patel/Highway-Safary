import React from "react";

const blogs = [
    {
        id: 1,
        title: "Top 5 Road Trips in India",
        desc: "Explore the most scenic and unforgettable road trips across India.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        date: "March 10, 2026",
    },
    {
        id: 2,
        title: "How to Plan a Perfect Trip",
        desc: "Step-by-step guide to plan your travel without stress.",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        date: "March 5, 2026",
    },
    {
        id: 3,
        title: "Best Budget Destinations",
        desc: "Travel more while spending less with these amazing places.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        date: "Feb 25, 2026",
    },
];

function Blog() {
    return (
        <div className="px-6 md:px-16 py-16 bg-white min-h-screen">

            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Travel Stories & Tips
                </h1>
                <p className="text-gray-600 mt-4">
                    Discover guides, tips, and inspiration for your next journey.
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-[220px] object-cover"
                        />

                        <div className="p-5">
                            <p className="text-sm text-gray-400 mb-2">{blog.date}</p>

                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {blog.title}
                            </h2>

                            <p className="text-gray-600 text-sm mb-4">
                                {blog.desc}
                            </p>

                            <button className="text-black font-medium hover:underline">
                                Read More →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Blog;