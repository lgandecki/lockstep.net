Emoji = {};

Emoji.baseImagePath = '/emojis/';

Emoji.convert = function (str) {
    if (typeof str !== 'string') {
        return '';
    }

    return str.replace(/:[\+\-a-z0-9_]+:/gi, function(match) {
        var imgName = match.slice(1, -1),
            path = Emoji.baseImagePath + imgName + '.png';
        return '<img class="emoji" title="' + match + '" src="' + path + '"/>';
    });
};

// borrowed code from https://github.com/meteor/meteor/blob/devel/packages/showdown/template-integration.js
if (Package.templating) {
    var Template = Package.templating.Template;
    var Blaze = Package.blaze.Blaze; // implied by `templating`
    var HTML = Package.htmljs.HTML; // implied by `blaze`

    Blaze.Template.registerHelper('emoji', new Template('emoji', function () {
        var view = this,
            content = '';

        if (view.templateContentBlock) {
            // this is for the block usage eg: {{#emoji}}:smile:{{/emoji}}
            content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
        }
        else {
            // this is for the direct usage eg: {{> emoji ':blush:'}}
            content = view.parentView.dataVar.get();
        }
        return HTML.Raw(Emoji.convert(content));
    }));
}