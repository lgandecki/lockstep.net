Template.pricing.events({
    "click a": function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log("click");
        _makePayment()
    }
});


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

