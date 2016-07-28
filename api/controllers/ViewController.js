'use strict'

const Controller = require('trails-controller')

module.exports = class ViewController extends Controller {
  helloWorld(req, res) {
    res.render('index.html', { asset_path: 'govuk_modules/govuk_template/assets/', name: 'Hello world!' })
  }
}
