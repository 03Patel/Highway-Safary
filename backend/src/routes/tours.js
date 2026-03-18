const express = require("express");
const router = express.Router();
const Tour = require("../models/Tour");

router.get('/', async (req, res) => {
    const items = await Tour.find({});
    res.json(items);

});

router.get("/image", async (req, res) => {
    const image = await Tour.find().select("image")
    res.json(image)
})
module.exports = router;