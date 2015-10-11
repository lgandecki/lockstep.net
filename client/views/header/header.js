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
                active: false
            },
            {
                name: "Pricing (?)",
                url: "/pricing",
                active: false
            },
            {
                name: "Help!",
                url: "/help",
                active: false
            },
            {
                name: "Save account",
                url: "/save",
                active: false
            }
        ];

        _links.forEach(function(link) {
            if (Session.equals("activeUrl", link.url)) {
                link.active = "active";
            }
        });
        return _links;
    }
});