Template.chapp_form.created = function() {
    Deps.autorun(function () {
        var _user = Meteor.user();
        if (_user && _user.currentTeam) {
            Meteor.subscribe("chapps", _user.currentTeam);
        }
        if (Chapps.find().count() > 1) {
            var _heightInt = $('#allChapsForHeight').height() + 'px';
            $('#scrollMePlz').slimScroll({
                height: '200px',
                scrollTo: _heightInt
            });
        }
    })
};

Template.chapp_form.helpers({
    chapp: function() {
        var docId = Session.get('chapp-docid');
        return Chapps.find({

        },{
            sort: {
                chatDate: 1
            }
        });
    }
});

Template.chapp_item.helpers({

    formatDate: function(date) {
        return moment(date).format('hh:mm:ss');
    }
})


Template.chapp_form.events({
    'submit #chapp-form': function(event) {
        event.preventDefault();
        var id = Meteor.user().currentTeam;
        var uname = Meteor.user().profile.sillyName;
        var text = document.getElementById('chapp-input').value;
        if(id && uname && text != '') {
            Meteor.call('enterChat', text, id, uname);
            document.getElementById('chapp-input').value = '';
            document.getElementById('chapp-input').focus();
            var objDiv = document.getElementById("chapp_text");
            objDiv.scrollTop = objDiv.scrollHeight + 170;
        }

    }
});