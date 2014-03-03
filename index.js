module.exports = function(context, descriptor){
  var steps = descriptor.steps || 4
  var offset = mod(context.params.offset || 0, steps)
  var step = descriptor.step != null ? descriptor.step : offset
  var trim = descriptor.trim || [0, 1]
  var length = (trim[1] - trim[0]) / steps
  var start = trim[0] + (step * length)
  return [start, start+length]
}

function mod(n, m) {
  return ((n%m)+m)%m
}