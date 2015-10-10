Meteor.publish("tasks", function() {
    return Tasks.find({userId: this.userId, current: true});
});

returnActiveTeamUsers = function(userId) {
    var _activeTeamUsers = [];
    if (userId) {
        var _user = Meteor.users.findOne({_id: userId});
        var _team = Teams.findOne({_id: _user.currentTeam, userIds: userId, current: true, private: false});
        _team.userIds.forEach(function(otherUserId) {
            console.log("iterating over team members ", otherUserId);
            var otherUser = Meteor.users.findOne({_id: otherUserId});
            if (otherUser.currentTeam === _team._id) {
                _activeTeamUsers.push(otherUser._id);
            }
        });
    }
    return _activeTeamUsers;
}

//TODO make sure to figure out a way to have private teams.
Meteor.publish("otherPeopleTasks", function(teamId) {
    check(teamId, String);

    return Tasks.find({teamId: teamId, current: true});
});