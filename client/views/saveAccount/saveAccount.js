Template.saveAccount.events({
    "click a.linkWithFacebook": function(e) {
        e.preventDefault();
        Meteor.linkWithFacebook();
    },
    "click a.addAccount": function(e) {
        e.preventDefault();
        //$('#signUpWithEmailModal').modal('show');
    }
});


Template.addEmailAccount.events({
    'submit #signUp': function(e, t) {
        e.preventDefault();
        var _email = $(".newEmail").val();
        var _password = $(".newPassword").val();

        var _user = {
            "email": _email,
            "password": _password
        };

        //var _id = Accounts.createUser(_user);

        $('#signUpWithEmailModal').modal('hide');

        //Meteor.call("updateUser", )

        Accounts.setPassword(Meteor.userId(), _password);

        Accounts.addEmail(Meteor.userId(), _email);


        //Meteor.loginWithPassword(_email, _password, function(err) {
        //    if (err) {
        //        //bootbox.alert("<br/>Please make sure you are not trying to register account with the same email address again!");
        //    } else {
        //        //Router.go("/");
        //    }
        //});
        // setTimeout(function() {
        //     _collection = {
        //         "name": "Main collection"
        //     };

        //     Meteor.call('newCollection', _collection);
        // }, 50);
    }
});