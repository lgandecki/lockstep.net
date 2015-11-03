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

class LoginState {
	static get() {
		if (Meteor.userId()) {
			return true;
		}
		return false;
	}
}

TLink = React.createClass({
	// mixins: [ReactMeteorData],

	// getMeteorData() {
	// 	return {
	// 		loginState: LoginState.get()
	// 	}
	// },

	render() {
		var linkItems = this.props.items.map(function(items) {
			var renderItem = false;
            if (Meteor.userId()) {
                if (items.logIn) {
                    renderItem = true;
                } else if (!items.logOut) {
                    renderItem = true;
                }
            } else {
                if (!items.logIn) {
                    renderItem = true;
                } else if (items.logOut) {
                    renderItem = true;
                }
            }

            items.active = "topNav";
            if (Session.equals("activeUrl", items.url)) {
                items.active = "topNav active";
            }


			if (renderItem) {
				return (
					<li className={items.active}><a href={items.url}>{items.name}</a></li>
				);
			}
		});

		return (
                    <ul className="main-nav hidden-xs hidden-sm">
                    {linkItems}
                    </ul>			
		);
	}
});

THeader = React.createClass({
	render() {
		return (
    <div id="navigation" className="navbar-fixed-top">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <a href="/" id="myBrand">&nbsp;</a>

                    <h2>lockstep.net</h2>
                </div>
                <div className="col-md-8">
                	<TLink items={_links} />
                </div>
            </div>
        </div>
    </div>			
		);
	}
});