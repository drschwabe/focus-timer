#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    _ = require('underscore'),
    ProgressBar = require('progress'), 
    notifier = require('node-notifier')

console.log('\n### Focus Timer ###')

Date.prototype.now = function () {
   return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes()
}

var ft = {}

ft.start = function(minutes) {

  var startTime = new Date()
    console.log('%s minute session (%s start)', minutes, startTime.now())

  var milliseconds = minutes * 60000,
      seconds = minutes * 60

  //Progress bar:
  var bar = new ProgressBar(':bar', { total: seconds })
  var timer = setInterval(function () {
    bar.tick()
    if (bar.complete) {
      var endTime = new Date()
      console.log('focus session complete! (%s end)', endTime.now())
      console.log('\007') //< Sound effect.
      notifier.notify({
        title: "Focus Timer", 
        message: minutes + ' minute session is complete.'
      })
      clearInterval(timer);
    }
  }, 1000)
}

//Parse user issued command from terminal:
if( _.isEmpty(argv._) || !ft[argv._[0]]) return
ft[ argv._[0] ]( argv._[1] )
