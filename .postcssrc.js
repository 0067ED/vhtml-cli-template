// https://github.com/michael-ciniawsky/postcss-load-config
var packageConfig = require('./package.json')

module.exports = (ctx) => ({
    plugins: [
          require('postcss-salad')({
              //  "browsers": ["ie > 8", "last 2 versions"],
              "browsers": packageConfig.browserlist,
              "features": {
                partialImport: {
                  addDependencyTo: ctx.webpack
                }
              }
            }
          )
      ]
})
