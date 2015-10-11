Meteor.methods({
    "returnTimeStampDiffIfJoinedDuringTask": function() {
        console.log("running this retarted function");
        if (this.userId) {
            console.log("inside user");
            var _user = Meteor.users.findOne({_id: this.userId});
            var _team = Teams.findOne({_id: _user.currentTeam, userIds: _user._id});
            console.log("team ", JSON.stringify(_team));
            if (_team && _team.timerTimestamp) {
                console.log("has got a team, generating diff");
                var _now = new Date();
                var _diff = _now.valueOf() - _team.timerTimestamp.valueOf();
                console.log("diff is ", _diff);
                if (_diff <= 25 * 60 * 1000) {
                    console.log("Am I returning?");
                    return _diff;
                } else {
                    return undefined;
                }
            }
        }
        return undefined;
    }
});