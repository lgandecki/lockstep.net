FlowRouter.route("/", {
    action: function() {
        BlazeLayout.render('layout', {header: "header", main: "announcement"});
    }
});

FlowRouter.route("/focus", {

   action: function() {
       BlazeLayout.render("layout", {header: "header", main: "focus"});
   }
});