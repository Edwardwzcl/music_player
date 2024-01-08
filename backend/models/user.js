var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type:String,unique :true,required:true},
    password: {type : String, minlength : 6, required:true},
    // store song id
    recent:[{
        'id':String,
        'name':String
    }], // limit 10
    like : [{
        'id':String,
        'name':String,
        'artistId':String,
        'artistName':String
    }]
});

module.exports = mongoose.model("User",UserSchema);