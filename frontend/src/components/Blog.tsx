import React from "react";
import Footer from "./Footer";
import Heading from "./Heading";

// ✅ move data outside component
const blogs = [
    {
        id: 1,
        title: "Top 10 Places to Visit in India",
        desc: "Explore the most beautiful destinations across India, from mountains to beaches.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        date: "March 1, 2026",
    },
    {
        id: 2,
        title: "How to Plan a Perfect Trip",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
        desc: "Step-by-step guide to plan your travel without stress.",
        date: "March 5, 2026",
    },
    {
        id: 3,
        title: "Best Beach Destinations in the World",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
        desc: "Discover stunning beaches with crystal clear water and white sand.",
        date: "March 8, 2026",
    },
    {
        id: 4,
        title: "Budget Travel Tips for Beginners",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
        desc: "Learn how to travel the world without spending too much money.",
        date: "March 10, 2026",
    },
    {
        id: 5,
        title: "Top Mountain Adventures You Must Try",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",
        desc: "Experience thrilling adventures in the world’s most beautiful mountains.",
        date: "March 12, 2026",
    },
    {
        id: 6,
        title: "Best Cities for Nightlife Lovers",
        image: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=600&q=80",
        desc: "Explore cities that come alive at night with vibrant culture and energy.",
        date: "March 15, 2026",
    },
    {
        id: 7,
        title: "Solo Travel Guide for First-Time Travelers",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
        desc: "Everything you need to know before going on your first solo trip.",
        date: "March 18, 2026",
    },
    {
        id: 8,
        title: "Hidden Gems You Must Visit in 2026",
        image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80",
        desc: "Unexplored destinations that offer unique and peaceful experiences.",
        date: "March 20, 2026",
    },
    {
        id: 9,
        title: "Top Food Destinations Around the World",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        desc: "Taste the best cuisines from famous food destinations globally.",
        date: "March 22, 2026",
    },
    {
        id: 10,
        title: "Best Weekend Getaways Near You",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
        desc: "Short and refreshing trips perfect for a quick escape from daily life.",
        date: "March 27, 2026",
    }
];

function Blog() {
    return (
        <div className="px-6 md:px-16 py-16 bg-white min-h-screen">

            <Heading
                h="Stories & Travel Guides"
                p="Dive into curated travel stories, hidden gems, and expert insights designed to inspire your next adventure."
            />

            {/* Heading */}
            <div className="text-center mb-12 mt-10">
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
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            loading="lazy" // ✅ lazy load
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

            <Footer />
        </div>
    );
}

export default React.memo(Blog);