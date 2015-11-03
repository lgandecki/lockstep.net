
var _makePayment = function() {
    var amount = 999;
    StripeCheckout.open({
        key: Meteor.settings.public.stripePublishableKey,
        amount: amount,
        name: 'I heart lockstep.net',
        description: '$9.99 - support appreciated! :)',
        panelLabel: 'Reserve 50% discount',
        token(res) {
            var _stripeToken = res.id;
            Meteor.call('chargeCard', _stripeToken, amount);
        }
    });
};

TPricing = React.createClass({
    handleClick(e) {
        console.log('wchodze do handelclick')
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        console.log('czy jest preventdefault:', e.isDefaultPrevented());
        _makePayment();
    },

    render() {
        return (
    <div className="row">
        <div className="col-md-8 center">
            <div className="box box-bordered box-color">
                <div className="box-title">
                    <h3>So... Do I have to pay?</h3>
                </div>
                <div className="box-content padding">
                <p>Well, no. ;-)</p>
                    <p>We want to help you concentrate and work better for ever, for free.</p>
                    <p>You will always be able to use this software to match up with fellow lockstepers, get stuff done, have casual conversations from hardoworking people around the globe, and compete on the number of achievements</p>
                    <p>Having said that, we will be introducing paid plans for organized teams/companies</p>
                    <p>Till then, if you like what you see and would like to express your interest:</p>
                    <p><a href="#" className="tip" onClick={e => this.handleClick(e)}>Click here to secure a 50% discount on the coming paid plans</a></p>
                </div>
            </div>
        </div>
    </div>
        );
    } 
});