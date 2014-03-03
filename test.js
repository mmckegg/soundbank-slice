var slice = require('./index')
var test = require('tape')

test(function(t){
  var slicer = {
    trim: [0, 1],
    steps: 4
  }

  var values = [-1,0,1,2,3,4].map(function(x){
    var context = {params: {offset: x}}
    return slice(context, slicer)
  })

  t.deepEqual(values, [
    [0.75,1],
    [0,0.25],
    [0.25,0.5],
    [0.5,0.75],
    [0.75,1],
    [0,0.25]
  ])

  t.end()
})