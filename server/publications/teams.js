Meteor.publish("myTeam", function(teamId) {
    check(teamId, String);
    console.log("subscribing to my team");
    return Teams.find({_id: teamId, userIds: this.userId});
});