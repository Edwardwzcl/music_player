var secrets = require('../config/secrets.js');
var User = require('../models/user.js');
const AWS = require('aws-sdk');
const CLIENT_ID = 'qni0gn1jl119fg43qgti8l72p';
let INVALIDPWORD = 'InvalidPasswordException';
let USEREXIST = 'UsernameExistsException';
//var cache = require('../config/cache.js')
module.exports = function(router) {

    var registerRoute = router.route('/user/register');

    registerRoute.post(async function(req, res) {
        // get username, password
        const cognito = new AWS.CognitoIdentityServiceProvider({});

        const params = {
            ClientId : CLIENT_ID,
            Username : req.body.username,
            Password : req.body.password,
            UserAttributes:[
                {Name : 'email',
            Value : req.body.email}
            ]
        };
        console.log(params);
        const response = '';
        try {
            response = await cognito.signUp(params).promise();
            console.log(response);
        } catch(error) {
            console.log(error);
            if(error.code === INVALIDPWORD ) {
                return res.status(400).send({
                    message :'invalid password format',
                    data :error.toString()
                });
            }else if(error.code == USEREXIST ) {
                return res.status(403).send({
                    message :'UsernameExistsException',
                    data :error.toString()
                });
            }

            return res.status(500).send({
                message :'error happens',
                data: error.toString()
            })
        };
        var newUser = {};
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        var user = new User(newUser);
        user.save().then(function(data) {
            // redirect to index page
            req.session.username = data.username;
            console.log(req.session);
        }).catch(function(error) {
            return res.status(500).send({
                message : 'Error',
                data : error.toString()
            });
        });
        const params_admin = {
            UserPoolId: 'us-east-2_gophLC4f1', // Your Cognito User Pool ID
            Username: newUser.username // The username of the user to confirm
          };
          
          try {
            const data = await cognito.adminConfirmSignUp(params_admin).promise();
            console.log(data); 
            return res.status(200).send({
                message :"successfully register a new user",
                data :[]
            });

          } catch (error) {
            return res.status(500).send({
                message : 'Error',
                data : error.toString()
            });
          }
        
    })
    return router;
    
}
