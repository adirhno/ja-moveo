const songController = require("../controllers/song.controllers.js");
const router = require("express").Router()

router.post("/", songController.addSong);
router.get("/lyrics/:name", songController.getLyrics);
router.get("/:name", songController.getSong);


module.exports = router;