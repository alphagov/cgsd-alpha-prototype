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
    var Promise = require('bluebird');
    var volumeQueryAsync = Promise.promisify(this.app.orm.TaskVolumeRecord.query);

    var friendly_id = req.params.dept_or_agency;
    this.app.services.DepartmentService.getDepartmentByFriendlyId(friendly_id)
        .then(function(record) {
            var task_ids = record.tasks.map(function(task) {
                return task.id
            });

            volumeQueryAsync(
                'SELECT *  from taskvolumerecord WHERE task IN ($1)',
                task_ids
            )
            .then(function(volume_records) {
                var volume_summary = new TaskVolumeSummary(volume_records,
                    record.tasks, record.agencies);
                return volume_summary
            })
            .then(function(volume_summary) {
                res.render(
                    'performance-data/show.html',
                    {
                        asset_path: '/govuk_modules/govuk_template/assets/',
                        organisation_type: 'department', // remember there is a service to determine this
                        organisation: record,
                        volume_summary: volume_summary,
                        grouped_volumes: volume_summary.agencies()
                    }
                )
            })
        })
        .catch(err => {
      this.app.services.AgencyService.getAgencyByFriendlyId(friendly_id)
          .then( record => {
              var task_ids = record.tasks.map(function(task) {
                 return task.id
              });

              volumeQueryAsync(
                  'SELECT *  from taskvolumerecord WHERE task IN ($1)',
                  task_ids
              )
              .then(function(volume_records) {
                  var volume_summary = new TaskVolumeSummary(volume_records,
                      record.tasks, record.agencies);
                  return volume_summary
              })
              .then(function(volume_summary) {
                  res.render(
                      'performance-data/show.html',
                      {
                          asset_path: '/govuk_modules/govuk_template/assets/',
                          organisation_type: 'agency', // remember there is a service to determine this
                          organisation: record,
                          volume_summary: volume_summary,
                          grouped_volumes: volume_summary.tasks()
                      }
                  )
              })
         })
         .catch(err => {});
    });
  }
}
