Template.history.helpers({
    completedTasks: function () {
        var _user = Meteor.user();
        if (_user) {
            return Tasks.find({userId: _user._id, type: "done"}).fetch();
        }
    },
    plannedTasks: function () {
        var _user = Meteor.user();
        if (_user) {
            return Tasks.find({userId: _user._id, type: "planned"}).fetch();
        }
    }
})

Template.history.onRendered(function() {
    this.subscribe("allDoneTasks");
    this.subscribe("allPlannedTasks");
});