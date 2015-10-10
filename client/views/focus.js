Template.focus.onCreated(function() {
    this.subscribe("tasks");
    this.subscribe("otherPeopleTasks");
    this.subscribe("myTeam");
});