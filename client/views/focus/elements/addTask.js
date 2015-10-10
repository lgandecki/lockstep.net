Template.addTask.events({
    'submit #new-task': function(ev) {
        ev.preventDefault();
        var _selector = $("#new-task input[type='text']")
        var _task = _selector.val();
        if (_task && _task !== "") {
            Meteor.lockstep.insertTask(_task, "planned");
            _selector.val("");
        }
    }
});