Template.focus.onCreated(function() {
    this.subscribe("tasks");
    var _that = this;
    Tracker.autorun(function() {

        if (Meteor.user()) {
            var _myTeamId = Meteor.user().currentTeam;
            console.log("calling this reactively");
            if (_myTeamId) {
                Session.set("_myTeam", _myTeamId);
                _that.subscribe("otherPeopleTasks", _myTeamId);
                _that.subscribe("myTeam", _myTeamId);
                _that.subscribe("teamMembers", _myTeamId);
            }
        }
    });
});