Meteor.users.allow({
    update: function(userId, doc, fieldNames) {
        return (userId && doc._id === userId && !_.contains(fieldNames,"currentTeam"));
    }
})