# postcss-remove-mutations

Postcss plugin to comment out mutations of base styles from a stylesheet

## Usage

```js
var fs = require('fs')
var postcss = require('postcss')
var removeMutations = require('postcss-remove-mutations')

var baseCss = fs.readFileSync('./base.css', 'utf8')
var customCss = fs.readFileSync('./app.css', 'utf8')

var css = postcss()
  .use(removeMutations({
    immutables: baseCss
  })
  .process(customCss)
  .css
```

See also:
https://github.com/johnotander/immutable-css

MIT License

