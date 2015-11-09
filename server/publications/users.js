Meteor.publish("userData", function() {
   return Meteor.users.find({_id: this.userId}, {fields: {currentTeam: 1, ready: 1, interval: 1}});
});

returnActiveTeamUsers = function(userId) {
    var _activeTeamUsers = [];
    if (userId) {
        var _user = Meteor.users.findOne({_id: userId});
        var _team = Teams.findOne({_id: _user.currentTeam, userIds: userId, current: true, private: false});
        _team && _team.userIds.forEach(function(otherUserId) {
            console.log("iterating over team members ", otherUserId);
            var otherUser = Meteor.users.findOne({_id: otherUserId});
            if (otherUser.currentTeam === _team._id) {
                _activeTeamUsers.push(otherUser._id);
            }
        });
    }
    return _activeTeamUsers;
}

Meteor.publish("teamMembers", function(teamId) {
    check(teamId, String);
    // shouid check whether user has that team as current

    return Meteor.users.find({currentTeam: teamId}, {fields: {currentTeam: 1, "profile.sillyName": 1, ready: 1}});
});