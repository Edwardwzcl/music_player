var secrets = require('../config/secrets');
const {playlist_highquality_tags,playlist_detail} = require('NeteaseCloudMusicApi')
module.exports = function(router) {

    var genreRouter = router.route('/genre');

    genreRouter.get(async function(req,res) {
        var list = [];
        try {
            const data = await playlist_highquality_tags();
            const hottags = data.body.tags;
            //const len = hottags.length;
            for(let i = 0; i < 9 ; i++) {
                let ind = 3 * i;
                var ele = {
                    "id" : hottags[ind].id,
                    "name" :hottags[ind].name
                };
                list.push(ele);
            }
            // id name
            console.log(list);
            res.json({message:'Success',
        data: list});
            
        } catch(error) {
            return res.status(500).send({
                message :'error happens',
                data : error.toString()
            });
        }
    })

    genreRouter.post(async function(req,res) {
        const timestamp = new Date().getTime();
        var query = {
            "id" : req.body.id,
            "timestamp":timestamp
        };
        
        var list = [];
        try {
            const data = await playlist_detail(query);
            const songs = data.body.playlist.tracks;
            //console.log(songs);

            for(let i = 0; i < 10 && i < songs.length;i++) {
                var ele = {
                    "songId":songs[i].id,
                    "songName":songs[i].name,
                    "artistId":songs[i].ar[0].id,
                    "artistName":songs[i].ar[0].name
                };
                list.push(ele);
            }
        } catch(error) {
            return res.status(500).send({
                message :'error happens',
                data : error.toString()
            });
        }
        
        return res.status(200).send({
            data : list,
            message : 'successfully get result'
        });
        
    })
    return router;
}