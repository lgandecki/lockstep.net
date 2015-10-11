/* globals Tasks:true */
//"use strict";

Tasks = new Mongo.Collection("tasks");

Tasks.allow({
    insert: function(userId, doc) {
        return (userId && doc.userId === userId);
    },
    update: function(userId, doc, fieldNames) {
        return (userId && doc.userId === userId) || (fieldNames.length === 1 && fieldNames[0] === "emojis");
    },
    remove: function(userId, doc) {
        return doc.userId === userId;
    },
    fetch: ['userId']
});

Meteor.methods({
    "cleanUpTasksOnStart": function() {

        if (Meteor.userId()) {
            Tasks.update({
                userId: Meteor.userId(),
                type: "done",
                current: true
            }, {$set: {current: false}}, {multi: true});

            Tasks.update({
                userId: Meteor.userId(),
                type: "planned",
                phase: 2,
                current: true
            }, {$set: {current: false}}, {multi: true});

            Tasks.update({
                userId: Meteor.userId(),
                type: "planned",
                phase: 1,
                current: true
            }, {$set: {phase: 2}}, {multi: true});

            console.log("do i have Meteor.userId",  Meteor.userId());
            console.log("Do i have this,user", this.userId);
            var _user = Meteor.users.findOne({_id: this.userId});
            if (Meteor.isServer) {
                console.log("running this on the server");
                var _query = {_id: _user.currentTeam, userIds: _user._id};
                console.log("_query ", _query);
                var _team = Teams.findOne({_query});
                console.log("_team ", _team);
                Teams.update(_query, {$set: {test: "test", timerTimestamp: new Date()}});
            }

        }
    }
});