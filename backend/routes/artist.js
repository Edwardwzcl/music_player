
const{artist_songs,artist_detail} = require('NeteaseCloudMusicApi')

module.exports = function(router) {


    var arRouter = router.route('/artist/:id');
    
    arRouter.get(async function(req,res) {
        var query = {
            "id" : req.params.id
        };
        var list = [];
        var info = {};
        try {
            const data = await artist_detail(query);
            info.cover = data.body.data.artist.cover;
            info.name = data.body.data.artist.name;
            info.id = data.body.data.artist.id;

        } catch(error) {
            return res.status(500).send({
                message:"error",
                data:error.toString()
            });
        }
        try {const data = await artist_songs(query);
        const songs = data.body.songs;
        for(let i = 0; i <10 && i < songs.length; i++) {
            var ele = {
                "songId" : songs[i].id,
                "songName":songs[i].name
            }
            list.push(ele);
        }
        
        } catch(error) {
            return res.status(500).send({
                message:"error",
                data:error.toString()
            });
        }

        // list of song, songId, songName
        var data = {info,list};
        res.json({message:'Success',
        data: data});
    })
    return router;
}