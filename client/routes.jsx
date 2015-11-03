FlowRouter.route("/", {
    action: function() {
        setActiveLink();
        ReactLayout.render(TLayout, { content: <TAnnouncement /> });
    }
});

/*
FlowRouter.route("/focus", {

    action: function() {
        if (!Meteor.user()) {
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
                Meteor.call("findAndJoinTeam", function(error, teamId) {
                    console.log("found team ", teamId);
                });
            });

        } else {
            Meteor.call("findAndJoinTeam", function(error, teamId) {
                console.log("found team ", teamId);
            });
        }
        BlazeLayout.render("layout", {header: "header", main: "focus"});
        setActiveLink();
    }
});

*/

FlowRouter.route("/history", {
    action: function() {
        // BlazeLayout.render("layout", {header: "header", main: "history"});
        setActiveLink();
        ReactLayout.render(TLayout, { content: <THistory /> });
    }
});


FlowRouter.route("/pricing", {
    action: function() {
        // BlazeLayout.render("layout", {header: "header", main: "pricing"});
        setActiveLink();
        ReactLayout.render(TLayout, { content: <TPricing /> });
    }
});

/*

FlowRouter.route("/save", {
    action: function() {
        BlazeLayout.render("layout", {header: "header", main: "saveAccount"});
        setActiveLink();
    }
});

*/

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
        setActiveLink();
        ReactLayout.render(TLayout, { content: <THelp /> });
    }
});

var setActiveLink = function() {
    Session.set("activeUrl", FlowRouter.current().route.path);
};

//FlowRouter.triggers.enter([setActiveLink]);
