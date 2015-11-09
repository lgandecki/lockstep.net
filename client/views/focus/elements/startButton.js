"use strict";
Template.startButton.helpers({
    counter: function() {
       var _counter = _calculateCounter();
        return "(" + _counter.ready + "/" + _counter.outOf + ")";
    },
    buttonText: function() {
        var _user = Meteor.user();
        if (_user) {
            if (_user.ready) {
                return "Waiting...";
            }
        }
        return "Start!";
    },
    disable: function() {
        var _todoTaskExists = Tasks.findOne({type: "planned", phase: 1, userId: Meteor.userId()});

        if (!_todoTaskExists) {
            return "disabled";
        } else {
            return "";
        }
    }
});

Template.startButton.events({
   "click button": function() {
       console.log("clicking a button");
       // When new user joins team, set his interval to team interval
       // increment user interval on click
       // when the Tracker.autorun below starts the timer, set the team interval to random team member interval value.
       Meteor.users.update({_id: Meteor.userId()}, {$set: {ready: true}, $inc: {interval: 1}});
   }
});

Template.startButton.onCreated(function() {
    Tracker.autorun(function() {
        var _counter = _calculateCounter();

        console.log("reactive counter ", _counter);

        if (_counter.ready > 0 && (_counter.ready === _counter.outOf)) {
            console.log("Let's start pomodoro!");

            Meteor.lockstep.timer(Meteor.lockstep.workTime);

            Meteor.call("setTeamInterval");
            Meteor.call("cleanUpTasksOnStart");
        }
    });

    Meteor.call("returnTimeStampDiffIfJoinedDuringTask", function(err, res) {
        console.log("res", res);
        if (res) {
            Meteor.lockstep.timer(Meteor.lockstep.workTime - (res / (60 * 1000)));
        }
    });
});


var _calculateCounter = function() {
    var _ready = 0;
    var _outOf = 0;
    var _user = Meteor.users.findOne({_id: Meteor.userId()}, {fields: {currentTeam: 1}});
    if (_user && _user.currentTeam) {
        var _team = Teams.findOne({_id: _user.currentTeam}, {fields: {interval: 0}});
        if (_team) {
            _outOf = _team.userIds.length;
            _team.userIds.forEach(function(userId) {
                var _otherUser = Meteor.users.findOne({_id: userId}, {fields: {ready: 1}});
                if ((_otherUser && _otherUser.ready)) {
                    _ready++;
                }
            });
        }
    }
    return {ready: _ready, outOf: _outOf};
};