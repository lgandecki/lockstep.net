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
       Meteor.users.update({_id: Meteor.userId()}, {$set: {ready: true}});
   }
});

Template.startButton.onCreated(function() {
    Tracker.autorun(function() {
        var _counter = _calculateCounter();

        console.log("reactive counter ", _counter);

        if (_counter.ready > 0 && (_counter.ready === _counter.outOf)) {
            console.log("Let's start pomodoro!");

            Meteor.lockstep.timer(Meteor.lockstep.workTime);

            Meteor.call("cleanUpTasksOnStart");

        }
    });
});


var _calculateCounter = function() {
    var _ready = 0;
    var _outOf = 0;
    var _user = Meteor.user();
    if (_user && _user.currentTeam) {
        var _team = Teams.findOne({_id: _user.currentTeam});
        if (_team) {
            _outOf = _team.userIds.length;
            _team.userIds.forEach(function(userId) {
                var _otherUser = Meteor.users.findOne({_id: userId});
                if ((_otherUser && _otherUser.ready)) {
                    _ready++;
                }
            });
        }
    }
    return {ready: _ready, outOf: _outOf};
};