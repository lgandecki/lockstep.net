Meteor.methods({
    enterChat: function(chatText,chatDoc,chatUser) {
        check(chatText, String);
        check(chatDoc, String);
        check(chatUser, String);

        Chapps.insert({
            chatText: chatText,
            chatDoc: chatDoc,
            chatUserName: chatUser,
            chatDate: new Date()
        })
    }
});

Meteor.publish("chapps", function(docId) {
    check(docId, String);

    var query = {
        chatDoc: docId
    };

    return Chapps.find(query,{
        sort: {
            chatDate: -1
        },
        limit: 50
    });
});