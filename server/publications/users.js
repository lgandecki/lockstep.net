Meteor.publish("userData", function() {
   return Meteor.users.find({_id: this.userId}, {fields: {currentTeam: 1}});
});

Meteor.publish("teamMembers", function() {
    var _activeTeamUsers = returnActiveTeamUsers.call(this);
    console.log("_activeTeamUsers", _activeTeamUsers);
    return Meteor.users.find({_id: {$in: _activeTeamUsers}}, {fields: {currentTeam: 1, "profile.sillyName": 1}});
});