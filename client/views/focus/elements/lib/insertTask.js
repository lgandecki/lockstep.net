if (!Meteor.lockstep) {
    Meteor.lockstep = {};
}
Meteor.lockstep.insertTask = function(display, type) {

    var _task = {
        timestamp: new Date(),
        display: display,
        userId: Meteor.userId(),
        type: type,
        current: true,
        teamId: Meteor.user().currentTeam
    };
    if (type === "planned") {
        _task.phase = 1;
    } else if (type === "done") {
        _task.phase = 2;
    }

    Tasks.insert(_task);
};