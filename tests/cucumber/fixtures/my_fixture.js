(function () {

  'use strict';

  Meteor.methods({
    'reset' : function() {
      Tasks.remove({});
      Teams.remove({});
      Meteor.users.remove({});
      // you can do some resetting of your app here
      // fixture code will only execute inside mirrors neither runs
      // inside the main app nor gets bundled to production.
    }
  });

})();