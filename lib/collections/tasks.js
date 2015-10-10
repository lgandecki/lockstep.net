Tasks = new Mongo.Collection("tasks");

Tasks.allow({
    insert: function(userId, doc) {
        return (userId && doc.userId === userId);
    },
    update: function(userId, doc) {
        return (userId && doc.userId === userId);
    },
    remove: function(userId, doc) {
        return doc.userId === userId;
    },
    fetch: ['userId']
});