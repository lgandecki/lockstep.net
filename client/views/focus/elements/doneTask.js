Template.doneTask.events({
    'submit #done-task': function(ev) {
        ev.preventDefault();
        var $selector = $("#done-task input[type='text']");
        var _task = $selector.val();
        if (_task && _task !== "") {
            Meteor.lockstep.insertTask(_task, "done");
            $selector.val("");
        }
    }
});