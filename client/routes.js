FlowRouter.route("/", {
    action: function() {
        BlazeLayout.render('layout', {header: "header", main: "announcement"});
        setActiveLink();
    }
});

FlowRouter.route("/focus", {

   action: function() {
       if (!Meteor.user()) {
           var _name = Meteor.lockstep.generateSillyName();
           var _randomId =  new Meteor.CollectionObjectID()._str;
           var _randomPassword =  new Meteor.Collection.ObjectID()._str;
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




var setActiveLink = function() {
    Session.set("activeUrl", FlowRouter.current().route.path);
};

//FlowRouter.triggers.enter([setActiveLink]);
