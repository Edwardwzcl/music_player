var secrets = require('../config/secrets.js');
var User = require('../models/user.js');
const CLIENT_ID = 'qni0gn1jl119fg43qgti8l72p';
const AWS = require('aws-sdk');
//var cache = require('../config/cache.js');



module.exports = function(router) {

    var verifyRoute = router.route('/user/register/verify');

    verifyRoute.post(async function(req,res){
        const cognito = new AWS.CognitoIdentityServiceProvider();

        var verification = req.body.content;
        var uname = req.body.username;
        if(!verification || !uname) {
            return res.status(400).send({
                message :'Please type in verification',
                data:[]
            });
        }
        const params = {
            ClientId: CLIENT_ID,
            ConfirmationCode: verification, // The confirmation code the user received
            Username: uname, // The username of the user
        };
        try {
            const response = await cognito.confirmSignUp(params).promise();
            console.log(response);
            req.session.username = uname;
            console.log(req.session);
            return res.status(200).send({
                message :'successfully login',
                data: response
            })
        } catch(error) {
            return res.status(500).send({
                message :"Error happens",
                data:error.toString()
            })
        }


    })

    return router;

    
}

