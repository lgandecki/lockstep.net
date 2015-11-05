Meteor.publish("userData", function() {
   return Meteor.users.find({_id: this.userId}, {fields: {currentTeam: 1, ready: 1}});
});


Meteor.publish("teamMembers", function(teamId) {
    check(teamId, String);
    // shouid check whether user has that team as current

    return Meteor.users.find({currentTeam: teamId}, {fields: {currentTeam: 1, "profile.sillyName": 1, ready: 1}});
});