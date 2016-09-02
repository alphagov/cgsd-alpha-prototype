'use strict'

const TransactionPerformanceSummary = require('./../models/TransactionPerformanceSummary.js');

const Controller = require('trails-controller')

module.exports = class ViewController extends Controller {
  home(req, res) {
    var query = "DVLA";

    this.app.orm.Department.query('SELECT * FROM department WHERE name = $1', [query], function(err, results) { console.log('**** ', results[0]) });

    res.render('index.html', { asset_path: '/govuk_modules/govuk_template/assets/' })
  }

  prototypeV0Home(req, res) {
    res.render('prototype-v0/index.html', { asset_path: '/govuk_modules/govuk_template/assets/' })
  }

  transactionalView(req, res) {
    this.app.orm.TransactionVolumeRecord.findOne(
      { transaction_status: 'started' }).exec(function (err, record) { console.log(record); });
    this.app.orm.TransactionVolumeRecord.find(
      { transaction_status: 'started' }).exec(
        function (err, records) {
          var tps = new TransactionPerformanceSummary(records);
          res.render(
            'prototype-v0/transactions/index.html',
            { asset_path: '/govuk_modules/govuk_template/assets/',
              object: tps
            }
          );
        });
  }
}
