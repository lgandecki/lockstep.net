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
            Tasks.update({userId: Meteor.userId(), type: "done", current: true}, {$set: {current: false}});

            Tasks.update({userId: Meteor.userId(), type: "planned", phase: 2, current: true}, {$set: {current: false}});

            Tasks.update({userId: Meteor.userId(), type: "planned", phase: 1, current: true}, {$set: {phase: 2}});


        }
    }
});