Template.taskList.helpers({
    user() {
        var _user = Meteor.user();
        var _team;
        var _users = [];
        if (_user && _user.currentTeam) {
            _team = Teams.findOne({_id: Meteor.user().currentTeam});
            if (_team) {
                _users = _team.userIds;
            }
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
    tasksPlanned() {
        return Tasks.find({userId: this.toString(), current: true, type: "planned", phase: 2});
    },
    tasksDone() {
        return Tasks.find({userId: this.toString(), current: true, type: "done"})
    },
    tasksToDo() {
        return Tasks.find({userId: this.toString(), current: true, type: "planned", phase: 1});
    }
});


// the moment we click start we change done to current: false
// we change planned phase: 2
// we change phase 2 to current: false
// we switch from e