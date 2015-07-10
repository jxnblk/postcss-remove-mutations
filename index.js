
var _defaults = require('lodash').defaults
var postcss = require('postcss')
var getClassnames = require('./lib/get-classnames')

module.exports = postcss.plugin('postcss-remove-mutations', function (opts) {

  opts = opts || {}
  opts = _defaults(opts, {
    immutables: ''
  })

  var immutables = []
  var immutableRoot

  if (typeof opts.immutables === 'string') {
    immutableRoot = postcss.parse(opts.immutables)
  } else if (typeof opts.immutables === 'object') {
    immutableRoot = opts.immutables
  }

  immutableRoot.eachRule(function (rule) {
    var classnames = getClassnames(rule.selector)
    if (classnames.length) {
      immutables = immutables.concat(classnames)
    }
  })

  return function (root, result) {

    root.eachRule(function (rule) {
      var classnames = []
      rule.selectors.forEach(function (selector) {
        classnames = classnames.concat(
          getClassnames(selector)
        )
      })
      var mutations = []
      classnames.forEach(function (classname) {
        var index = immutables.indexOf(classname)
        if (index > -1) {
          mutations.push(immutables[index])
        }
      })
      if (mutations.length) {
        var ruleCss = postcss().process(rule).css
        var comment = postcss.comment({
          text: [
            'ERROR! This rule mutates ',
            mutations.join(),
            ' and has been disabled.',
            ruleCss
          ].join('')
        })
        result.warn(rule.selector + ' mutates ' + mutations.join() + ' and has been commented out.', { node: rule })
        rule.replaceWith(comment)
      }
    })

  }

})

