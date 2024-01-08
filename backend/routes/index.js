/*
 * Connect all of your endpoints together here.
    app.use: mount the specified middleware functions at the path
    app.use(path, callback)
 */




    module.exports = function (app, router) {
        app.use('/', require('./home.js')(router));
        app.use('/search',require('./search.js')(router));
        app.use('/genre',require('./genre.js')(router));
        app.use('/user/login',require('./login.js')(router));
        app.use('/user/register',require('./register.js')(router));
        app.use('/artist/:id',require('./artist.js')(router));
        app.use('/song/:id',require('./songview.js')(router));
        app.use('/recent',require('./recent.js')(router));
        app.use('/like',require('./like.js')(router));
        app.use('/user/register/verify',require('./verify.js')(router));
        app.use('/signout',require('./signout.js')(router));
        
    };
    