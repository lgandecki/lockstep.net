Template.registerHelper("formatDate", function(date) {
    return moment(date).format('hh:mm');
});

Template.registerHelper("notEmptyCursor", function(cursor) {
    return cursor && cursor.count() > 0;
});

Template.registerHelper("emptyArray", function(array) {
    console.log("array", array);
    return !array || array.length === 0;
});