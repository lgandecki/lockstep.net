Tasks = new Mongo.Collection("tasks");

Tasks.allow({
    insert: function(userId, doc) {
        return (userId && doc.owner === userId);
    },
    update: function(userId, doc) {
        return (userId && doc.owner === userId);
    },
    remove: function(userId, doc) {
        return doc.owner === userId;
    },
    fetch: ['owner']
});