Meteor.methods({
    findAndJoinTeam: function() {
        console.log("how many times running findAndJoin and for user ", this.userId);
        var _openTeam = Teams.findOne({current: true, userIds: {$size: 1}, private: false});
        var _teamId;
        if (!_openTeam) {
            _teamId = Teams.insert({current: true, userIds: [this.userId], private: false});
        } else {
            Teams.update({_id: _openTeam._id}, {$addToSet: {userIds: this.userId}});
            _teamId = _openTeam._id;
        }
        Meteor.users.update({_id: this.userId}, {$set: {currentTeam: _teamId}});
    }
});


// this doesn't work when user refresh the page - put them back to the same team.

// last task for a team for a person shouldn't be older than 50 minutes. otherwise remove from a team.