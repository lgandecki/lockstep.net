UserStatus.events.on("connectionLogout", function(fields) {
   Teams.update({userIds: fields.userId}, {$pull: {userIds: fields.userId}}, {multi: true});
    Meteor.users.update({_id: fields.userId}, {$set: {ready: false}});
    Teams.remove({userIds: {$size: 0}});
});