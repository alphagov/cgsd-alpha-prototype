'use strict'

const Controller = require('trails-controller')

module.exports = class ViewController extends Controller {
  home(req, res) {
    var query = "DVLA";

    this.app.orm.Department.query('SELECT * FROM department WHERE name = $1', [query], function(err, results) { console.log('**** ', results[0]) });

    res.render('index.html', { asset_path: 'govuk_modules/govuk_template/assets/', name: 'Hello world!' })
  }
}
