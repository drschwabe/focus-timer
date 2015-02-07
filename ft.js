var argv = require('minimist')(process.argv.slice(2)),
    _ = require('underscore')

console.log('### Focus Timer ###');

var ft = {}

ft.start = function(milliseconds) {
  setTimeout(function() {
    console.log('time is up!');
  }, milliseconds)
}

//Parse user issued command from terminal:
if( _.isEmpty(argv._) || !ft[argv._[0]]) return;
//Execute the corresponding function with arguments, if any:
ft[ argv._[0] ]( argv._[1], argv._[2], argv._[3], argv._[4] )



