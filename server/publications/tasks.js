Meteor.publish("tasks", function() {
    return Tasks.find({userId: this.userId, current: true});
});

function returnActiveTeamUsers() {
    var _activeTeamUsers = [];
    if (this.user) {
        var _team = Teams.findOne({_id: this.user.currentTeam, userIds: this.userId, current: true, private: false});
        _team.userIds.forEach(function(otherUserId) {
            var otherUser = Meteor.users.findOne({_id: otherUserId});
            if (otherUser.currentTeam === _team._id) {
                _activeTeamUsers.push(otherUser._id);
            }
        });
    }
    return _activeTeamUsers;
}

//TODO make sure to figure out a way to have private teams.
Meteor.publish("otherPeopleTasks", function() {
    var _activeTeamUsers = returnActiveTeamUsers.call(this);
    return Tasks.find({userId: {$in: _activeTeamUsers}, current: true});
});