Meteor.publish("tasks", function() {
    console.log("publishing my current tasks");
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
    console.log("publishing other people tasks");
    check(teamId, String);
    // shouid check whether user has that team as current

    return Tasks.find({teamId: teamId, current: true});
});

Meteor.publish("allDoneTasks", function() {
    console.log("publishing all done tasks");
    return Tasks.find({userId: this.userId, type: "done"});
});

Meteor.publish("allPlannedTasks", function() {
    console.log("publishing all planned tasks");
    return Tasks.find({userId: this.userId, type: "planned"});
})