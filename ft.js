var argv = require('minimist')(process.argv.slice(2)),
    _ = require('underscore'),
    cli = require('cli')

console.log('\n### Focus Timer ###');

Date.prototype.now = function () {
   return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
}

var ft = {}

ft.start = function(minutes) {

  var newTime = new Date()
    console.log('-- %s minute session (%s start) --', minutes, newTime.now())

  cli.spinner('focusing');

  //Convert minutes to milliseconds:
  var milliseconds = minutes * 60000

  //For displaying progress:
  var minutesFocused = 0
  var spinnerInterval = setInterval(function() {
    minutesFocused = minutesFocused + 1
    console.log(' (' + minutesFocused + ' minutes so far) ')
  }, 60000)

  //End timer:
  setTimeout(function() {
    clearInterval(spinnerInterval);
    console.log(' (' + minutes + ' minutes total)');
    console.log('\007'); //< Sound effect.
    cli.spinner('focus session complete!\n\n', true); //End the spinner
  }, milliseconds)
}



//Parse user issued command from terminal:
if( _.isEmpty(argv._) || !ft[argv._[0]]) return;
//Execute the corresponding function with arguments, if any:
ft[ argv._[0] ]( argv._[1], argv._[2], argv._[3], argv._[4] )



