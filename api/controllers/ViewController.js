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

  govtPerformanceView(req, res) {
    var Promise = require('bluebird');
    Promise.join(
      this.app.orm.Department.find({ where : {}, sort: 'name ASC' })
        .then( departments => { return departments }),
      this.app.orm.Agency.find({ where : {}, sort: 'name ASC' })
        .then( agencies => { return agencies }),
      this.app.orm.Task.find({ where : {}, sort: 'name ASC' })
        .then( tasks  => { return tasks }),
      this.app.orm.TaskVolumeRecord.find({})
        .then( task_volume_records => { return task_volume_records }),
      this.app.services.DepartmentService.getTransactionsReceivedByDept()
        .then( department_totals => { return department_totals }),
      function (departments, agencies, tasks, task_volume_records, department_totals) {
        var task_volume_summary = new TaskVolumeSummary(task_volume_records);
        department_totals = department_totals.map(function(department_total) {
          department_total.pct_total_received = Math.floor(
            (department_total.total_received / task_volume_summary.total_received) * 100) ;
          return department_total
        });
        res.render(
          'performance-data/government/show.html',
          {
            asset_path: '/govuk_modules/govuk_template/assets/',
            organisation_type: 'department', // remember there is a service to determine this
            departments: departments,
            agencies: agencies,
            tasks: tasks,
            department_totals: department_totals,
            task_volume_summary: task_volume_summary
          }
        )
      }
    )
  }

  performanceView(req, res) {
    var Promise = require('bluebird');
    var volumeQueryAsync = Promise.promisify(this.app.orm.TaskVolumeRecord.query);
    var friendly_id = req.params.dept_or_agency;
    this.app.services.DepartmentService.getDepartmentByFriendlyId(friendly_id)
      .then(function(department) {
        var task_ids = department.tasks.map(function(task) { return task.id });
        volumeQueryAsync(
          "SELECT *  from taskvolumerecord WHERE task IN (" + task_ids.join() + ")", // this is bad, I know but passing as $1 encloses the task ids in single apostrophes!
          []
        )
        .then(function(task_volume_records) {
          var task_volume_summary = new TaskVolumeSummary(
            task_volume_records, department.tasks, department.agencies);
          return task_volume_summary
        })
        .then(function(task_volume_summary) {
          res.render(
            'performance-data/show.html',
            {
              asset_path: '/govuk_modules/govuk_template/assets/',
              organisation_type: 'department', // remember there is a service to determine this
              organisation: department,
              volume_summary: task_volume_summary,
              grouped_volumes: task_volume_summary.agencies()
            }
          )
        })
      })
      .catch(err => {
        this.app.services.AgencyService.getAgencyByFriendlyId(friendly_id)
        .then( agency => {
          var task_ids = agency.tasks.map(function(task) {
            return task.id
          });

          volumeQueryAsync(
            "SELECT *  from taskvolumerecord WHERE task IN (" + task_ids.join() + ")", // this is bad, I know but passing as $1 encloses the task ids in single apostrophes!
            []
          )
          .then(function(task_volume_records) {
            var task_volume_summary = new TaskVolumeSummary(
              task_volume_records, agency.tasks, agency.agencies);
            return task_volume_summary
          })
          .then(function(task_volume_summary) {
            res.render(
              'performance-data/show.html',
              {
                asset_path: '/govuk_modules/govuk_template/assets/',
                organisation_type: 'agency', // remember there is a service to determine this
                organisation: agency,
                volume_summary: task_volume_summary,
                grouped_volumes: task_volume_summary.tasks()
              }
            )
          })
        })
        .catch(err => {});
    });
  }
}
