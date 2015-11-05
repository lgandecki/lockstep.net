// You can include npm dependencies for support files in tests/cucumber/package.json
var _ = require('underscore');


module.exports = function() {
    var browsers;

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    this.Given(/^I am a new user$/, function() {
        browsers = {
            Alice: Alice,
            Bob: Bob
        };
        server.call('reset'); // server is a connection to the mirror
    });

    this.When(/^([^ ]*) goes to "([^"]*)"$/, function(person, relativePath) {
        Alice.url();
        browsers[person].url(url.resolve(process.env.ROOT_URL, relativePath));
    });

    this.When(/^([^ ]*) should not be logged in$/, function(person) {
        var _login = 'a[href="/login"]';
        browsers[person].waitForExist(_login);
        expect(browsers[person].isVisible(_login)).toBe(true);

    });

    this.Then(/^([^ ]*) should be logged in$/, function(person) {
        var _logout = 'a[href="/logouts"]';
        browsers[person].waitForExist(_logout);
        expect(browsers[person].isVisible(_logout)).toBe(true);
    });

    this.Then(/^([^ ]*) should see (her|his) name in task window$/, function(person) {
        var _name = browsers[person].execute(function() {
            return Meteor.user().profile.sillyName;
        }).value;
        var _nameContainer = 'div.cucumber-user=' + _name;
        browsers[person].waitForExist(_nameContainer);
    });

    var _newTask = "new task";
    this.When(/^([^ ]*) adds a task$/, function(person, callback) {
        var _taskInput = "#new-task > input";
        browsers[person].waitForExist(_taskInput);
        browsers[person].setValue(_taskInput, _newTask);
    });

    this.Then(/^([^ ]*) should see the task as todo$/, function(person, callback) {
        
    });


    this.When(/^([^ ]*) adds a task$/, function(person, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^([^ ]*) clicks start$/, function(person, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the clock should be hidden$/, function(person, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^([^ ]*) should see the clock$/, function(person, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

};
