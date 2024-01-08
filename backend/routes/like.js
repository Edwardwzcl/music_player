var User = require('../models/user.js')
//var cache = require('../config/cache.js');


module.exports = function(router) {
    var likeRoute = router.route('/like');

    likeRoute.get(function(req,res) {
        if(!req.session.username) {
            return res.status(400).send({
                message : "not login",
                data : []
            });
        }
        var uname = req.session.username;
        User.findOne({'username':uname}).exec().then(function(data) {
            var likeList = data.like;
            return res.status(200).send({
                message : 'successfully find like list',
                data : likeList
            });
        }).catch(function(error) {
            return res.status(500).send({
                message : 'error happens',
                data : error.toString()
            });
        })
    });
    return router;

}