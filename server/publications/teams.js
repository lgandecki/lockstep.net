Meteor.publish("myTeam", function() {
    var _currentTeam = "";
    if (this.user) {
        _currentTeam = this.user.currentTeam;
    }
    return Teams.findOne({_id: _currentTeam, userIds: this.userId});
});