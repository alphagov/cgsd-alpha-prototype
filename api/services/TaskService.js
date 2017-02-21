'use strict'

const Service = require('trails-service')

/**
 * @module TaskService
 * @description Useful services for tasks
 */
module.exports = class TaskService extends Service {
  /**
   * Find a task by its friendly_id
   */
  getTaskByFriendlyId(friendly_id) {
    return this.app.orm.Task.findOne({
      friendly_id: friendly_id }).populate('agency').populate('department')
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithOutcome(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) \
       FROM task \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE task.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithUsersIntendedOutcome(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) \
       FROM task \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE task.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions by department
   */
  sumTransactionCountsByTask(filter, filter_type) {
    var sql;

    sql = "SELECT task.friendly_id AS friendly_id, \
            task.name, \
            ( SELECT SUM(count) as transactions_received_count \
              FROM taskvolumerecord \
              WHERE taskvolumerecord.task = task.id \
            ), \
            ( \
              SELECT SUM(count) as transactions_received_online_count \
              FROM taskvolumerecord \
              WHERE taskvolumerecord.task = task.id \
              AND taskvolumerecord.channel = 'online' \
            ), \
            ( \
              SELECT SUM(count) as transactions_received_phone_count \
              FROM taskvolumerecord \
              WHERE taskvolumerecord.task = task.id \
              AND taskvolumerecord.channel = 'phone' \
            ), \
            ( \
              SELECT SUM(count) as transactions_received_paper_count \
              FROM taskvolumerecord \
              WHERE taskvolumerecord.task = task.id \
              AND taskvolumerecord.channel = 'paper' \
            ), \
            ( \
              SELECT SUM(count) as transactions_received_face_to_face_count \
              FROM taskvolumerecord \
              WHERE taskvolumerecord.task = task.id \
              AND taskvolumerecord.channel = 'face-to-face' \
            ), \
            ( \
              SELECT SUM(count) as transactions_received_other_count \
              FROM taskvolumerecord \
              WHERE taskvolumerecord.task = task.id \
              AND taskvolumerecord.channel = 'other' \
            ), \
            ( \
              SELECT SUM(all_outcomes_count) as transactions_with_outcome_count \
              FROM transactionsendinginanoutcome \
              WHERE transactionsendinginanoutcome.task = task.id \
            ), \
            ( \
              SELECT SUM(users_intended_outcome_count) as transactions_with_users_intended_outcome_count \
              FROM transactionsendinginanoutcome \
              WHERE transactionsendinginanoutcome.task = task.id \
            ) \
     FROM task \
     INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
     ";

    if (filter) {
      if (filter_type == 'department') {
        sql += "INNER JOIN agency ON agency.id = task.agency \
                INNER JOIN department ON department.id = agency.department \
                WHERE department.friendly_id = '{department}'\
               ";
        sql = sql.replace(/{department}/, filter)
      } else {
        sql += "INNER JOIN agency ON agency.id = task.agency \
                WHERE agency.friendly_id = '{agency}'\
               ";
        sql = sql.replace(/{agency}/, filter)

      };
    }

    sql += "GROUP BY task.id, task.name \
      ORDER BY transactions_received_count DESC \
      ";

    return this.app.orm.Task.query(
      sql,
      []
    );
  }
}
