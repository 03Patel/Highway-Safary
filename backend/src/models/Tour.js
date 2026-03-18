const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
    name: String,
    location: String,
    image: String,
    days: Number,
    price: Number,
    rating: Number,
    description: String,
    viewButton: String
});

module.exports = mongoose.model("Tour", TourSchema);