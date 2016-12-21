'use strict'

const TaskVolumeSummary = require('./../models/TaskVolumeSummary.js');

const Controller = require('trails-controller')

module.exports = class ViewController extends Controller {

  home(req, res) {
    res.render(
      'index.html',
      {
        asset_path: '/govuk_modules/govuk_template/assets/'
      }
    )
  }

  search(req, res) {
    res.redirect('/performance-data/' + req.query.selectedId);
  }

  taskPerformanceView(req, res) {
    res.render(
      'performance-data/tasks/show.html',
      {
         asset_path: '/govuk_modules/govuk_template/assets/'
      }
    )
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
        .then( department_totals => { return department_totals.rows }),
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
    var friendly_id = req.params.friendly_id;
    var task_volume_service = this.app.services.TaskVolumeRecordService;
    var department_service = this.app.services.DepartmentService;
    var default_service = this.app.services.DefaultService;
    this.app.services.TaskService.getTaskByFriendlyId(friendly_id)
      .then(function(task) {
        if (task == undefined) { throw true };
        task_volume_service.getTotalVolumeByTask([task.id])
          .then( task_volume_records => {
            var task_volume_summary = new TaskVolumeSummary(task_volume_records.rows);
            res.render(
              'performance-data/tasks/show.html',
              {
                asset_path: '/govuk_modules/govuk_template/assets/',
                department: task.department,
                agency: task.agency,
                task: task,
                volume_summary: task_volume_summary
              }
            )
          })
      })
      .catch(err => {
        this.app.services.DepartmentService.getDepartmentByFriendlyId(friendly_id)
          .then(function(department) {
            if (department == undefined) { throw true };
            var task_ids = department.tasks.map(function(task) { return task.id });
            var Promise = require('bluebird');
            Promise.join(
              task_volume_service.getTotalVolumeByTask(task_ids)
                .then( task_volume_records => { return task_volume_records.rows }),
              department_service.getTransactionsReceivedByAgency(department.friendly_id)
                .then( agency_totals => { return agency_totals.rows }),
              department_service.getTransactionsReceivedByTask(department.friendly_id)
                .then( transaction_totals => { return transaction_totals.rows }),
              function(task_volume_records, agency_totals, transaction_totals) {
                console.log(task_volume_records);
                var task_volume_summary = new TaskVolumeSummary(task_volume_records);
                res.render(
                  'performance-data/show.html',
                  {
                    asset_path: '/govuk_modules/govuk_template/assets/',
                    organisation_type: default_service.organisationType(department),
                    organisation: department,
                    volume_summary: task_volume_summary,
                    grouped_volumes: agency_totals,
                    transaction_volumes: transaction_totals
                  }
                )
              }
            )
          })
          .catch(err => {
            var agency_service = this.app.services.AgencyService;
            this.app.services.AgencyService.getAgencyByFriendlyId(friendly_id)
              .then(function(agency) {
                var task_ids = agency.tasks.map(function(task) { return task.id });
                var Promise = require('bluebird');
                Promise.join(
                  task_volume_service.getTotalVolumeByTask(task_ids)
                    .then( task_volume_records => { return task_volume_records.rows }),
                  agency_service.getTransactionsReceivedByTask(agency.friendly_id)
                    .then( task_totals => { return task_totals.rows }),
                  function(task_volume_records, task_totals) {
                    var task_volume_summary = new TaskVolumeSummary(task_volume_records);
                    res.render(
                      'performance-data/show.html',
                      {
                        asset_path: '/govuk_modules/govuk_template/assets/',
                        organisation_type: default_service.organisationType(agency),
                        organisation: agency,
                        volume_summary: task_volume_summary,
                        grouped_volumes: task_totals
                      }
                    )
                  }
                )
              }
            )
          })
      })
  }

  guidancecalls(req, res) {
    res.render('performance-data/guidancecalls.html', { asset_path: '/govuk_modules/govuk_template/assets/' })
  }

  guidancecasework(req, res) {
    res.render('performance-data/guidancecasework.html', { asset_path: '/govuk_modules/govuk_template/assets/' })
  }

  searchpage(req, res) {
    this.app.orm.Department.query(
      "SELECT friendly_id, name \
       FROM department \
       UNION SELECT friendly_id, name \
       FROM agency \
       UNION SELECT friendly_id, name \
       FROM task \
       ORDER BY name ASC",
      [],
      function(err, results) {
        res.render(
          'performance-data/searchpage.html',
          {
            asset_path: '/govuk_modules/govuk_template/assets/',
            search_options: results
          })
      }
    );
  }

  channels(req, res) {
    res.render('performance-data/channels.html', { asset_path: '/govuk_modules/govuk_template/assets/' })
  }

}
