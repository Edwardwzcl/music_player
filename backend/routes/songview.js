
const{song_detail,song_url,lyric} = require('NeteaseCloudMusicApi')
var cache = require('../config/cache.js');
var User = require('../models/user.js');

module.exports = function(router) {


    var arRouter = router.route('/song/:id');
    // cover hyperlink : /song/:id

    
    arRouter.get(async function(req,res) {
        var query = {
            ids : req.params.id
        };
        console.log(req.params.id);
        var name;

        var name = '';
        var id = '';
        var artistId = '';
        var artistName = '';
        try {const data = await song_detail(query);
            const song = data.body.songs[0];
            if(song) {
            id = song.id;
            name = song.name;
            artistId = song.ar[0].id;
            artistName = song.ar[0].name;
            var ele = {
                songName: song.name,
                songId:song.id,
                artistName:artistName,
                artistId:artistId,
                cover:song.al.picUrl
            };} else {
            return res.status(404).send({
                message :'not found',
                data:[]
            });
        }     
        } catch(error) {
            return res.status(500).send({
                message:"error",
                data:error.toString()
            });
        }


        var query_2 = {
            id :req.params.id
        };
        try{
        const lyricData = await lyric(query_2);
        ele.lyric = lyricData.body.lrc.lyric;
        } catch(error) {
            return res.status(500).send({
                message:"error",
                data:error.toString()
            });
        }
        try {
            const urlData = await song_url(query_2);
            console.log(urlData.body.data);
            ele.url = urlData.body.data[0].url;
        }catch(error) {
            return res.status(500).send({
                message:"error",
                data:error.toString()
            });
        }
        // lyric, url

        if(req.session.username) {
            var uname = req.session.username;
            try {
                const userData = await User.findOne({"username" : uname}).exec();
                var newPlay = {};
                newPlay.id = id;
                newPlay.name = name;
                if(!userData.recent.includes(newPlay)){
                userData.recent.push(newPlay);
                if(userData.recent.length > 10) {
                    userData.recent.shift();
                }
                await userData.save();
            }
            } catch(error) {
                return res.status(500).send({
                    message:"error",
                    data:error.toString()
                });
            }
        }
        
        res.json({message:'Success',
        data: ele});
    });
    arRouter.post(async function(req,res) {
        // on click like button
        if(!req.session.username) {
            return res.status(404).send({
                message : 'have not login',
                data:[]
            });
        }
        var newLike = {
            'id' : req.body.id,
            'name': req.body.name,
            'artistId': req.body.artistId,
            'artistName': req.body.artistName
        };
        

        User.findOne({"username":req.session.username}).then(async function(userData) {
            if(!userData.like.includes(newLike)) {
                userData.like.push(newLike);
                await userData.save();
            }
            return res.status(200).send({
                message:'successfully add to like list',
                data: userData
            })
        }).catch(function(error) {
            return res.status(500).send({
                message:"error",
                data:error.toString()
            });
        });
       
    })


    return router;
}