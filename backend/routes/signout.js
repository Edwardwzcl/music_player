const AWS = require('aws-sdk');
const CLIENT_ID = 'qni0gn1jl119fg43qgti8l72p';



// Sign out function
module.exports = function(router) {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    var signoutRouter = router.route('/signout');
    signoutRouter.post(function(req, res) {
        const params = {
            AccessToken: req.body.accessToken 
        };

        cognito.globalSignOut(params, function(err, data) {
            if (err) {
                
                res.status(500).send({
                    message: 'Error signing out',
                    data: err.toString()
                });
            } else {
                console.log(data);           // successful response
                req.session = null;
                console.log(req.session);
                res.status(200).send({
                    message: 'Successfully signed out',
                    data: data
                });
            }
        });
    })
        return router;
}
