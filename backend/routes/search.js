var secrets = require('../config/secrets.js')
var User = require('../models/user.js')
const {search} = require('NeteaseCloudMusicApi')


module.exports = function(router) {
    var netRouter = router.route('/search');
    netRouter.post(async function(req,res) {
        
        var songs= [];
        var artist = [];
        
        var query = {};
        const timestamp = new Date().getTime();
        // form : content
        query.keywords = req.body.content;
        query.type = '1';
        query.timestamp = timestamp;
        try {
            const data = await search(query);
            var list  = data.body.result.songs;
            for(let i = 0; i < 10 && i < data.body.result.songCount; i++) {
                var ele = {};
                ele.id = list[i].id;
                ele.name = list[i].name;
                ele.artistName = list[i].artists[0].name || 'unknown';
                ele.artistId = list[i].artists[0].id;
                songs.push(ele);
            }
        } catch(error) {
            return res.status(500).send({
                message : error.toString()
            });
        }
        query.type = '100';
        try {
            const data = await search(query);
            var list = data.body.result.artists;
            let ct = data.body.result.artistCount;
            for(let i = 0; i < 10 && i < ct; i++) {
                var ele = {};
                ele.id = list[i].id;
                ele.name = list[i].name;
                ele.cover = list[i].img1v1Url;
                artist.push(ele);
            }
        } catch(error) {
            return res.status(500).send({
                message : error.toString()
            });
        }
        // [list of songs, list of artist]
        // [songId, songName, artistName, artistId,cover]
        // [artistId, artistName, cover]
        var data = {songs,artist};
        return res.status(200).send({
            data : data,
            message : 'successfully get result'
        });

    })
    return router;
}