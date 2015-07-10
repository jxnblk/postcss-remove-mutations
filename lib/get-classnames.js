
var specificity = require('specificity')

module.exports = function (selector) {

  return specificity.calculate(selector)[0].parts
    .filter(function (part) {
      return part.type === 'b'
    })
    .filter(function (part) {
      return part.selector.match(/^\./)
    })
    .map(function (part) {
      return part.selector
    })

}

