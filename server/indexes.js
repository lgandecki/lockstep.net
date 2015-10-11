"use strict";
Meteor.startup(function() {
   Tasks._ensureIndex({"userId": 1, "current": 1});
});