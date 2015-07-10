
var removeMutations = require('..')
var postcss = require('postcss')
var assert = require('assert')

var immutablecss = [
  '#serious { color: pink; }',
  '#seriously .notcool { color: gray; }',
  'h1 { font-size: 2.5rem; }',
  '.prose h1 { font-size: 3rem; }',
  '.brown { color: brown; }',
  '.red { color: red; }',
  '.tomato { color: tomato; }'
].join('\n')

var badcss = [
  '/* Please don’t write CSS like this */',
  '.tomato { width: 100%; height: 12px; display: block; color: tomato; }',
  '#potato { display: block; }',
  '.herp { height: 12px; display: block; color: tomato; }',
  '.brown { width: 100%; color: tomato; }',
  '.brown .red { color: orange; }',
  '.brown, .red, h1.tomato { color: green; }',
  '.derp { color: blue; }'
].join('\n')

var results

var processor = postcss([removeMutations({ immutables: immutablecss })])

describe('postcss-remove-mutations', function () {

  it('should not throw', function () {
    assert.doesNotThrow(function () {
      results = processor
        .process(badcss)
        .css
    })
  })

  it('should return a postcss lazy object', function () {
    results = processor.process(badcss)
    assert.equal(typeof results, 'object')
  })

})

