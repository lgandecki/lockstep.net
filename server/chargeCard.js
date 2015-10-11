Meteor.methods({
    'chargeCard': function(stripeToken, amount) {
        console.log("is this happening?", amount);
        check(stripeToken, String);
        check(amount, Number);
        var Stripe = StripeAPI(Meteor.settings.stripeSecretKey);

        Stripe.charges.create({
            source: stripeToken,
            amount: amount,
            currency: 'usd'
        }, function(err, charge) {
            console.log(err, charge);
        });
    }
});