if (!Meteor.lockstep) {
    Meteor.lockstep = {};
}
Meteor.lockstep.insertTask = function(display, type) {
    Tasks.insert({
        timestamp: new Date(),
        display: display,
        owner: Meteor.userId(),
        type: type,
        current: true
    })
};