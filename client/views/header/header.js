Template.header.helpers({
    menuLink: function() {
        var _links = [
            {
                name: "Lockstep",
                url: "/focus",
                active: false
            },
            {
                name: "Tasks Log",
                url: "/history",
                active: false,
                logIn: true
            },
            {
                name: "Pricing (?)",
                url: "/pricing",
                active: false,
                logIn: true
            },
            {
                name: "Help!",
                url: "/help",
                active: false
            },
            {
                name: "Save account",
                url: "/save",
                active: false,
                logIn: true
            },
            {
                name: "Login",
                url: '/login',
                active: false,
                logOut: true
            },
            {
                name: "Logout",
                url: '/logout',
                active: false,
                logIn: true
            }
        ];
        var _authorizedLinks = [];

        _links.forEach(function(link) {
            if (Meteor.userId()) {
                if (link.logIn) {
                    _authorizedLinks.push(link);
                } else if (!link.logOut) {
                    _authorizedLinks.push(link);
                }
            } else {
                if (!link.logIn) {
                    _authorizedLinks.push(link);
                } else if (link.logOut) {
                    _authorizedLinks.push(link);
                }
            }
            if (Session.equals("activeUrl", link.url)) {

                link.active = "active";
            }

        });
        return _authorizedLinks;
    }
});