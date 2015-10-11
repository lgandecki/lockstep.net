Meteor.publish("myTeam", function(teamId) {
    check(teamId, String);
    console.log("subscribing to my team");
    // shouid check whether user has that team as current
    return Teams.find({_id: teamId, userIds: this.userId}, {fields: {timerTimestamp: 0, test: 0}});
});