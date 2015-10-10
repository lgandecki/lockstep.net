Teams = new Mongo.Collection("teams");

Teams.allow({
    insert: function(userId, doc) {
        return true;
        //return (userId && doc.owner === userId);
    },
    update: function(userId, doc) {
        return userId && doc.userIds.indexOf(userId) > -1 && doc.private === false;
    },
    remove: function(userId, doc) {
        return false
    },
    fetch: ['userIds', 'private']
});