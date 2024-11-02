const Song = require("../models/Song");

class SongController {
  async addSong(req, res) {
    const { name, song, author } = req.body;

    try {
        let newSong = new Song({ name, author, song })
        newSong.save()
    } catch (error) {
      res.sendStatus(400);
    }
  }

  async getSong(req, res) {
    const { name } = req.params;
    
    try {
      const songs = await Song.find({ name: {$regex: name } });

       if (songs.length === 0) {
        return res.status(404).json({ message: "No songs found" });
      }
      res.status(200).json(songs);

       
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  }

  async getLyrics(req, res){
    const { name } = req.params
    try {
      const song = await Song.find({ name: name });
      console.log(song)
      res.status(200).json(song);

       
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }

  }
}

const songController = new SongController();
module.exports = songController;
