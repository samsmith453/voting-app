var Users = require("../models/users.js");

function ClickHandler () {

    this.getClicks = function (req, res) {
    var choice;
    var clicks;
    
    Users
        .findOne({"github.id": req.user.github.id}, {"_id": false})
        .exec(function(err, result){
            if(err) {throw err}
            choice = result.github.choice;
            
            Users
            .findOne({}, {"_id": false})
            .exec(function (err, result) {
            if (err) {throw err;}
            clicks = result;
            console.log(choice);
            res.json({
                "clicks": clicks,
                "choice": choice
            });
        });
        });
        
    // if you want to reset the choice
        // Users.findOneAndUpdate({"github.id": req.user.github.id}, {"github.choice": "none"})
        //  .exec(function(err, result){
        //      if(err) {throw err;}
        //  });
        
    // if you want to change the numbers   
        // Users.findOneAndUpdate({}, {"nbrClicks.angular": 10})
        //  .exec(function(err, result){
        //      if(err) {throw err;}
        //  });
    
        
    };
    
        
    
    this.addClick = function (req, res) {
        var choice = req.query.id;
        var inc = {"$inc":{}};
        inc["$inc"]["nbrClicks."+choice] = 1;
    
        Users.findOneAndUpdate({"github.id": req.user.github.id}, {"github.choice": choice})
         .exec(function(err, result){
             if(err) {throw err;}
         });
    
    Users
        .findOneAndUpdate({}, inc)
        .exec(function (err, result) {
                if (err) { throw err; }
                
                res.json(result.nbrClicks[choice]);
            }
        );
};

    this.resetClicks = function (req, res) {
    Users
        .findOneAndUpdate({"github.id": req.user.github.id}, { 'nbrClicks.clicks': 0 })
        .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result.nbrClicks);
            });
    };
}

module.exports = ClickHandler;