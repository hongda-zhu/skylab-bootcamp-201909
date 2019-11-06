var a = function() { console.log('pasa por a'); return 1; }
var b = function() { console.log('pasa por b'); return 2; }

// flow
//if (a() || b()) console.log('hola')

// evaluation
// a() || b()

// definition
//var c = a() || b() || 10
// var c = 10 && 1 || 5