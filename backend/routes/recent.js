var User = require('../models/user.js')
//var cache = require('../config/cache.js');


module.exports = function(router) {
    var recentRoute = router.route('/recent');

    recentRoute.get(function(req,res) {
        if(!req.session.username) {
            return res.status(404).send({
                message : 'have not login',
                data:[]
            });
        }
        var uname = req.session.username;
        User.findOne({'username':uname}).exec().then(function(data) {
            var recentList = data.recent;
            console.log(data);
            return res.status(200).send({
                message : 'successfully find recent play list',
                data : recentList
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