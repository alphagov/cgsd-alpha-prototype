'use strict'

const TaskVolumeSummary = require('./../models/TaskVolumeSummary.js');

const Controller = require('trails-controller')

module.exports = class ViewController extends Controller {

  home(req, res) {
    this.app.orm.Department.query(
        'SELECT friendly_id, name FROM department UNION SELECT friendly_id, name FROM agency ORDER BY name ASC', [],
        function(err, results) {
          res.render(
            'index.html',
            {
              asset_path: '/govuk_modules/govuk_template/assets/',
              options: results
            })
        });
  }

  search(req, res) {
    res.redirect('/performance-data/' + req.query.selectedId);
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

  performanceView(req, res) {
    var friendly_id = req.params.dept_or_agency;
    this.app.services.DepartmentService.getDepartmentByFriendlyId(friendly_id).then(
        record => {
          var task_ids = record.tasks.map(function(task) {
            return task.id
          });

          this.app.orm.TaskVolumeRecord.query(
            'SELECT *  from taskvolumerecord WHERE task IN ($1)',
            task_ids,
            function(err, results) {
              var volume_summary = new TaskVolumeSummary(results);
              res.render(
                'performance-data/show.html',
                {
                  asset_path: '/govuk_modules/govuk_template/assets/',
                  organisation_type: 'department', // remember there is a service to determine this
                  organisation: record,
                  volume_summary: volume_summary
                }
              )
            }
          )
        }
    ).catch(err => {
      this.app.services.AgencyService.getAgencyByFriendlyId(friendly_id).then(
          record => {
            var task_ids = record.tasks.map(function(task) {
              return task.id
            });

            this.app.orm.TaskVolumeRecord.query(
              'SELECT *  from taskvolumerecord WHERE task IN ($1)',
              task_ids,
              function(err, results) {
                var volume_summary = new TaskVolumeSummary(results);
                res.render(
                  'performance-data/show.html',
                  {
                    asset_path: '/govuk_modules/govuk_template/assets/',
                    organisation_type: 'agency', // remember there is a service to determine this
                    organisation: record,
                    volume_summary: volume_summary
                  }
                )
              }
            )
         }
      ).catch(err => {});
    });
  }
}
