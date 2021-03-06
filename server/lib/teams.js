"use strict";
Meteor.methods({
    findAndJoinTeam: function() {
        console.log("how many times running findAndJoin and for user ", this.userId);

        var _teamId;

        var _user = Meteor.users.findOne({_id: this.userId});
        var _previousTeamStillOpen;

        if (_user.currentTeam) {
            _previousTeamStillOpen = Teams.findOne({_id: _user.currentTeam, current: true, userIds: {$size: 1}})
        }
        if (_previousTeamStillOpen) {
            Teams.update({_id: _previousTeamStillOpen._id}, {$addToSet: {userIds: this.userId}});
            _teamId = _previousTeamStillOpen._id;
        } else {
            var _openTeam = Teams.findOne({current: true, userIds: {$size: 1}, private: false});
            if (!_openTeam) {
                _teamId = Teams.insert({current: true, userIds: [this.userId], private: false});
            } else {
                Teams.update({_id: _openTeam._id}, {$addToSet: {userIds: this.userId}});
                _teamId = _openTeam._id;
            }
            Tasks.update(
                {
                    userId: this.userId, current: true,
                    timestamp: {$gte: new Date(moment().startOf('day'))}
                },
                {
                    $set: {teamId: _teamId}
                },
                {multi: true}
            );

        }

        Meteor.users.update({_id: this.userId}, {$set: {currentTeam: _teamId}});
        return _teamId;
    },
    joinTeam: function(teamId) {
        check(teamId, String);
        var _user = Meteor.users.findOne({_id: this.userId});
        Teams.update({_id: teamId}, {$addToSet: {userIds: this.userId}});
        var _team = Teams.findOne({_id: teamId});
        Meteor.users.update({_id: this.userId}, {$set: {currentTeam: teamId}, interval: _team.interval});
    },
    setTeamInterval: function() {
        var _user = Meteor.users.findOne({_id: this.userId});
        Teams.update({_id: _user.currentTeam}, {$set: {interval: _user.interval}});
    }
});
