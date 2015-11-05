FlowRouter.route("/", {
    action: function() {
        BlazeLayout.render('layout', {header: "header", main: "announcement"});
        setActiveLink();
    }
});

var _checkOrCreateUser = function(cb) {
    if (_.isNull(Meteor.user())) {
        var _name = Meteor.lockstep.generateSillyName();
        var _randomId = new Meteor.Collection.ObjectID()._str;
        var _randomPassword = new Meteor.Collection.ObjectID()._str;
        Accounts.createUser({
            email: _randomId + "@lockstep.net",
            password: _randomPassword,
            profile: {
                sillyName: _name
            }
        }, function() {
            cb && cb();
        });
    } else {
        cb && cb();
    }
};

FlowRouter.route("/focus", {

    action: function() {
           _checkOrCreateUser(function() {
               console.log("Meteor user ", Meteor.user());
                Meteor.call("findAndJoinTeam", function(error, teamId) {
                    FlowRouter.go("/focus/" + teamId);
                });
            });
        setActiveLink();
    }
});

FlowRouter.route("/focus/:teamId", {
   action: function(params) {
       _checkOrCreateUser(function() {
           Meteor.call("joinTeam", params.teamId, function(error) {
               BlazeLayout.render("layout", {header: "header", main: "focus"});
           });
       });
   }
});

FlowRouter.route("/history", {
    action: function() {
        BlazeLayout.render("layout", {header: "header", main: "history"});
        setActiveLink();
    }
});


FlowRouter.route("/pricing", {
    action: function() {
        BlazeLayout.render("layout", {header: "header", main: "pricing"});
        setActiveLink();
    }
});


FlowRouter.route("/save", {
    action: function() {
        BlazeLayout.render("layout", {header: "header", main: "saveAccount"});
        setActiveLink();
    }
});


FlowRouter.route("/login", {
    action: function() {
        Meteor.loginWithFacebook(function() {
            FlowRouter.go("/lockstep");
        });
    }
});

FlowRouter.route("/logout", {
    action: function() {
        Meteor.logout(function() {
            FlowRouter.go("/");
        });
    }
});


FlowRouter.route("/help", {
    action: function() {
        BlazeLayout.render("layout", {header: "header", main: "help"});
        setActiveLink();
    }
});

var setActiveLink = function() {
    Session.set("activeUrl", FlowRouter.current().route.path);
};

//FlowRouter.triggers.enter([setActiveLink]);
