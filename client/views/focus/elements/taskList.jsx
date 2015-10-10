Template.taskList.helpers({
    user() {
        var _user = Meteor.user();
        var _team;
        var _users = [];
        if (_user && _user.currentTeam) {
            _team = Teams.findOne({_id: Meteor.user().currentTeam});
            _users = _team.userIds;
        }
        return _users;
    },
    name() {
        var _user = Meteor.users.findOne({_id: this.toString()});
        var _name = "";
        if (_user) {
            if (_user.useRealName && _user.profile.lastName) {
                _name = _user.profile.firstName + " " + _user.profile.lastName;
            } else {
                _name = _user.profile.sillyName;
            }
        }
        return _name;
    },
    tasksDone() {
        return Tasks.find({owner: this.toString(), current: true, type: "done"})
    },
    tasksPlanned() {
        return Tasks.find({owner: this.toString(), current: true, type: "planned"});
    }
});