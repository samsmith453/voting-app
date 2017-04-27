var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
    github:{
        id: String,
        displayName: String,
        username: String,
        publicRepos: Number,
        choice: String
    },
    nbrClicks:{
        clicks: Number,
        angular: Number,
        react: Number,
        redux: Number,
        ember: Number
    }
});

module.exports = mongoose.model("User", User);