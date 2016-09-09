'use strict'

const TaskVolumeSummary = require('./../models/TaskVolumeSummary.js');

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

  taskView(req, res) {
    this.app.services.TaskService.getTaskByFriendlyId(req.params.task).then(
        record => {
          this.app.orm.TaskVolumeRecord.find(
            { task: record.id }).then(
                records => {
                  var volume_summary = new TaskVolumeSummary(records);
                  res.render(
                    'prototype-v0/tasks/index.html',
                    { asset_path: '/govuk_modules/govuk_template/assets/',
                      task: record,
                      volume_summary: volume_summary
                    }
                  )
                }
              ).catch(err => {
              // Handle no volume records found
            })
        }
    ).catch(err => {
      // Handle task not found
    });
  }
}
