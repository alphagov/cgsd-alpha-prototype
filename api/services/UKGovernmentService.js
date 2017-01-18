'use strict'

const Service = require('trails-service')

/**
 * @module UKGovernmentService
 * @description Services for summarising data across UK Government
 */
module.exports = class UKGovernmentService extends Service {
  /**
   * Sum transactions by department
   */
  sumTransactionCountsByDept() {
    return this.app.orm.Department.query(
      "SELECT department.friendly_id, \
              department.name, \
              ( \
                SELECT COUNT(*) as agencies_count \
                FROM agency \
                WHERE agency.department = department.id \
              ), \
              ( \
                SELECT COUNT(*) as services_count \
                FROM task \
                WHERE task.department = department.id \
              ), \
              SUM(taskvolumerecord.count) as transactions_received_count, \
              ( \
                SELECT SUM(taskvolumerecord.count) as transactions_received_online_count \
                FROM task \
                INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
                WHERE task.department = department.id \
                AND   taskvolumerecord.channel = 'online' \
              ), \
              ( \
                SELECT SUM(taskvolumerecord.count) as transactions_received_phone_count \
                FROM task \
                INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
                WHERE task.department = department.id \
                AND   taskvolumerecord.channel = 'phone' \
              ), \
              ( \
                SELECT SUM(taskvolumerecord.count) as transactions_received_paper_count \
                FROM task \
                INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
                WHERE task.department = department.id \
                AND   taskvolumerecord.channel = 'paper' \
              ), \
              ( \
                SELECT SUM(taskvolumerecord.count) as transactions_received_face_to_face_count \
                FROM task \
                INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
                WHERE task.department = department.id \
                AND   taskvolumerecord.channel = 'face-to-face' \
              ), \
              ( \
                SELECT SUM(taskvolumerecord.count) as transactions_received_other_count \
                FROM task \
                INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
                WHERE task.department = department.id \
                AND   taskvolumerecord.channel = 'other' \
              ), \
              ( \
                SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) as transactions_with_outcome_count \
                FROM task \
                INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
                WHERE task.department = department.id \
              ), \
              ( \
                SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) as transactions_with_users_intended_outcome_count \
                FROM task \
                INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
                WHERE task.department = department.id \
              ) \
       FROM department \
       INNER JOIN task ON task.department = department.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       GROUP BY department.id, department.name \
       ORDER BY transactions_received_count DESC",
      []
    );
  }
}
