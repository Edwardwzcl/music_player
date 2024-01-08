var secrets = require('../config/secrets.js');
var User = require('../models/user.js');
const CLIENT_ID = 'qni0gn1jl119fg43qgti8l72p';
const AWS = require('aws-sdk');
//var cache = require('../config/cache.js');



module.exports = function(router) {

    var loginRoute = router.route('/user/login');

    loginRoute.post(async function(req,res){
        const cognito = new AWS.CognitoIdentityServiceProvider();

        var uname = req.body.username;
        var pword = req.body.password;
        if(!uname || !pword) {
            return res.status(400).send({
                message :'Please offer username and password',
                data:[]
            });
        }
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: CLIENT_ID,
            AuthParameters: {
            'USERNAME': uname,
            'PASSWORD': pword
            }
        };
        try {
            const response = await cognito.initiateAuth(params).promise();
            console.log(response);
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

