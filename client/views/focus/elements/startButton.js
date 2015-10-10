Template.startButton.helpers({
    counter: function() {
        var _ready = 0;
        var _outOf = 0;
        var _user = Meteor.user();
        if (_user && _user.currentTeam) {
            var _team = Teams.findOne({_id: _user.currentTeam});
            if (_team) {
                _outOf = _team.userIds.length;
                _team.userIds.forEach(function(userId) {
                    var _otherUser = Meteor.users.findOne({_id: userId});
                    if (!_otherUser || (_otherUser && _otherUser.ready)) {
                        _ready++;
                    }
                })
            }
        }
        return "(" + _ready + "/" + _outOf + ")";
    }
});

Template.startButton.events({
   "click btn": function() {
       Meteor.users.update({_id: this.userId}, {$set: {ready: true}});
   }
});