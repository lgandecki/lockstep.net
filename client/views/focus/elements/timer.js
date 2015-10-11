"use strict";
var futureDate = null, timerFunction = "nextLog",
clockTicking = null, alarm = null;

if (!Meteor.lockstep){
    Meteor.lockstep = {};
    Meteor.lockstep.restTime = 5;
    Meteor.lockstep.workTime = 25;
}

Template.timer.onRendered(function() {
    $(".knob").knob();
});


Template.timer.onCreated(function() {
    clockTicking = $("#clock-ticking")[0];
    alarm = $("#alarm")[0];
});

Meteor.lockstep.timer = function(minutes) {

    if (minutes) {
        setFutureDate(minutes);
    }
    clockTicking = $("#clock-ticking")[0];
    clockTicking.load();
    clockTicking.play();

    var _interval = setInterval(function() {
        var _currentDate = new Date();
        var _dd = futureDate - _currentDate;
        var _dmin = Math.floor(((_dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
        var _dsec = Math.floor((((_dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);
        var $ss = $(".second"),
            $mm = $(".minute");
        $ss.val(_dsec).trigger("change");
        $mm.val(_dmin).trigger("change");
        if (_dsec < 1 && _dmin < 1) {
            console.log("timerFunction inside timer", timerFunction);
            if (timerFunction === "rest") {
                afterRest();
            }
            else if (timerFunction === "nextLog") {
                afterLog();
            }
            window.clearInterval(_interval);
        } else {
            console.log("timerFunction inside timer", timerFunction, _dsec, _dmin);
        }
    }, 1000);
;}



var afterRest = function() {
    alarm.play();
    clockTicking.pause();
    timerFunction = "nextLog";
};


var ringAlarm = function() {
    alarm.load();
    alarm.play();
};

var afterLog = function() {
    ringAlarm();
    timerFunction = "rest";
    Meteor.lockstep.timer(Meteor.lockstep.restTime);
};



var setFutureDate = function(minutes) {
    var _now = new Date();
    futureDate = new Date(_now.getTime() + minutes * 60000);
};