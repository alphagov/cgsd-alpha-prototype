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
    var uk_government_service = this.app.services.UKGovernmentService;
    var department_service = this.app.services.DepartmentService;
    var default_service = this.app.services.DefaultService;
    var Promise = require('bluebird');
    Promise.join(
      this.app.orm.Department.find({ where : {}, sort: 'name ASC' })
        .then( departments => { return departments }), // then call anonymous function passing in one argument called 'departments'
      this.app.orm.Agency.find({ where : {}, sort: 'name ASC' })
        .then( agencies => { return agencies }),
      this.app.orm.Task.find({ where : {}, sort: 'name ASC' })
        .then( tasks  => { return tasks }),
      uk_government_service.sumTransactionCountsByDept()
        .then( transaction_counts_by_dept => { return transaction_counts_by_dept.rows })
        .then( function(transaction_counts_by_dept) {
          return transaction_counts_by_dept.map(function(counts) {
            counts.pct_users_intended_outcome = default_service.pct_of(
              counts.transactions_with_users_intended_outcome_count, counts.transactions_with_outcome_count);

              counts.pct_received_online = default_service.pct_of(
                counts.transactions_received_online_count, counts.transactions_received_count);

              counts.pct_received_phone = default_service.pct_of(
                counts.transactions_received_phone_count, counts.transactions_received_count);

              counts.pct_received_paper = default_service.pct_of(
                counts.transactions_received_paper_count, counts.transactions_received_count);

              counts.pct_received_face_to_face = default_service.pct_of(
                counts.transactions_received_face_to_face_count, counts.transactions_received_count);

              counts.pct_received_other = default_service.pct_of(
                counts.transactions_received_other, counts.transactions_received_count);

            return counts; })
        }),
      function (departments, agencies, tasks, transaction_counts_by_dept) {
        res.render(
          'performance-data/government/show.html',
          {
            asset_path: '/govuk_modules/govuk_template/assets/',
            organisation_type: 'department', // remember there is a service to determine this
            departments: departments,
            agencies: agencies,
            tasks: tasks,
            transaction_counts_by_dept: transaction_counts_by_dept
          }
        )
      }
    )
  }

  performanceView(req, res) {
    var friendly_id = req.params.friendly_id;
    var task_service = this.app.services.TaskService;
    var task_volume_service = this.app.services.TaskVolumeRecordService;
    var department_service = this.app.services.DepartmentService;
    var default_service = this.app.services.DefaultService;
    this.app.services.TaskService.getTaskByFriendlyId(friendly_id)
      .then(function(task) {
        if (task == undefined) { throw true };
        var Promise = require('bluebird');
        Promise.join(
          task_volume_service.getTotalVolumeByTask([task.id])
            .then( task_volume_records => { return task_volume_records.rows }),
          task_service.sumTransactionsWithOutcome(task.friendly_id)
            .then( transactions_with_outcome_count => { return transactions_with_outcome_count.rows[0].sum }),
          task_service.sumTransactionsWithUsersIntendedOutcome(task.friendly_id)
            .then( transactions_with_users_intended_outcome_count => { return transactions_with_users_intended_outcome_count.rows[0].sum }),
          function(task_volume_records, transactions_with_outcome_count, transactions_with_users_intended_outcome_count) {
            var task_volume_summary = new TaskVolumeSummary(task_volume_records);
            var pct_users_intended_outcome = default_service.pct_of(
                  transactions_with_users_intended_outcome_count, transactions_with_outcome_count);
            res.render(
              'performance-data/tasks/show.html',
              {
                asset_path: '/govuk_modules/govuk_template/assets/',
                department: task.department,
                agency: task.agency,
                task: task,
                volume_summary: task_volume_summary,
                transactions_with_outcome_count: transactions_with_outcome_count,
                transactions_with_users_intended_outcome_count: transactions_with_users_intended_outcome_count,
                pct_users_intended_outcome: pct_users_intended_outcome
              }
            )
          }
        )
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
              department_service.sumTransactionsWithOutcome(department.friendly_id)
                .then( transactions_with_outcome_count => { return transactions_with_outcome_count.rows[0].sum }),
              department_service.sumTransactionsWithUsersIntendedOutcome(department.friendly_id)
                .then( transactions_with_users_intended_outcome_count => { return transactions_with_users_intended_outcome_count.rows[0].sum }),
              department_service.getTransactionsReceivedByAgency(department.friendly_id)
                .then( agency_totals => { return agency_totals.rows }),
              department_service.getTransactionsReceivedByTask(department.friendly_id)
                .then( transaction_totals => { return transaction_totals.rows }),
              function(task_volume_records, transactions_with_outcome_count, transactions_with_users_intended_outcome_count, agency_totals, transaction_totals) {
                var task_volume_summary = new TaskVolumeSummary(task_volume_records);
                var pct_users_intended_outcome = default_service.pct_of(
                      transactions_with_users_intended_outcome_count, transactions_with_outcome_count);
                res.render(
                  'performance-data/show.html',
                  {
                    asset_path: '/govuk_modules/govuk_template/assets/',
                    organisation_type: default_service.organisationType(department),
                    organisation: department,
                    volume_summary: task_volume_summary,
                    transactions_with_outcome_count: transactions_with_outcome_count,
                    transactions_with_users_intended_outcome_count: transactions_with_users_intended_outcome_count,
                    pct_users_intended_outcome: pct_users_intended_outcome,
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
                  agency_service.sumTransactionsWithOutcome(agency.friendly_id)
                    .then( transactions_with_outcome_count => { return transactions_with_outcome_count.rows[0].sum }),
                  agency_service.sumTransactionsWithUsersIntendedOutcome(agency.friendly_id)
                    .then( transactions_with_users_intended_outcome_count => { return transactions_with_users_intended_outcome_count.rows[0].sum }),
                  agency_service.getTransactionsReceivedByTask(agency.friendly_id)
                    .then( task_totals => { return task_totals.rows }),
                  function(task_volume_records, transactions_with_outcome_count, transactions_with_users_intended_outcome_count, task_totals) {
                    var task_volume_summary = new TaskVolumeSummary(task_volume_records);
                    var pct_users_intended_outcome = default_service.pct_of(
                          transactions_with_users_intended_outcome_count, transactions_with_outcome_count);
                    res.render(
                      'performance-data/show.html',
                      {
                        asset_path: '/govuk_modules/govuk_template/assets/',
                        organisation_type: default_service.organisationType(agency),
                        organisation: agency,
                        transactions_with_outcome_count: transactions_with_outcome_count,
                        transactions_with_users_intended_outcome_count: transactions_with_users_intended_outcome_count,
                        pct_users_intended_outcome: pct_users_intended_outcome,
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
            search_options: results.rows
          })
      }
    );
  }

  channels(req, res) {
    res.render('performance-data/channels.html', { asset_path: '/govuk_modules/govuk_template/assets/' })
  }

}
