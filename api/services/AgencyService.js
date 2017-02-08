'use strict'

const Service = require('trails-service')

/**
 * @module AgencyService
 * @description Useful services for agencies
 */
module.exports = class AgencyService extends Service {
  /**
   * Find an agency by its friendly_id
   */
  getAgencyByFriendlyId(friendly_id) {
    return this.app.orm.Agency.findOne({
      friendly_id: friendly_id })
      .populate('tasks', { sort: 'name ASC'})
  }

  /**
   * Get total transactions received by task
   */
  getTransactionsReceivedByTask(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT task.friendly_id, \
              task.name, \
              SUM(taskvolumerecord.count) as total_received \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       WHERE agency.friendly_id = $1 \
       GROUP BY task.friendly_id, task.name \
       ORDER BY total_received DESC",
      [friendly_id]
    );
  }

  /**
   * Get total transactions received by task and channel
   */
  sumTransactionsReceivedByTaskAndChannel(friendly_id, channel) {
    return this.app.orm.Agency.query(
      "SELECT task.friendly_id, \
              task.name, \
              SUM(taskvolumerecord.count) as transactions_received_channel_count, \
              ( \
                SELECT SUM(taskvolumerecord.count) as transactions_received_count \
                FROM task AS t1 \
                INNER JOIN taskvolumerecord ON taskvolumerecord.task = t1.id \
                WHERE t1.id = task.id \
              ) \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       WHERE agency.friendly_id = $1 \
       AND taskvolumerecord.channel = $2 \
       GROUP BY task.id, task.friendly_id, task.name \
       ORDER BY transactions_received_channel_count DESC",
      [friendly_id, channel]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithOutcome(friendly_id) {
    return this.app.orm.Agency.query(
      "SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE agency.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithUsersIntendedOutcome(friendly_id) {
    return this.app.orm.Agency.query(
      "SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE agency.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions by department
   */
  sumTransactionCountsByDept(department) {
    var sql;
    sql = "SELECT agency.friendly_id, \
            agency.name, \
            ( \
              SELECT COUNT(*) as services_count \
              FROM task \
              WHERE task.agency = agency.id \
            ), \
            SUM(taskvolumerecord.count) as transactions_received_count, \
            ( \
              SELECT SUM(taskvolumerecord.count) as transactions_received_online_count \
              FROM task \
              INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
              WHERE task.agency = agency.id \
              AND   taskvolumerecord.channel = 'online' \
            ), \
            ( \
              SELECT SUM(taskvolumerecord.count) as transactions_received_phone_count \
              FROM task \
              INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
              WHERE task.agency = agency.id \
              AND   taskvolumerecord.channel = 'phone' \
            ), \
            ( \
              SELECT SUM(taskvolumerecord.count) as transactions_received_paper_count \
              FROM task \
              INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
              WHERE task.agency = agency.id \
              AND   taskvolumerecord.channel = 'paper' \
            ), \
            ( \
              SELECT SUM(taskvolumerecord.count) as transactions_received_face_to_face_count \
              FROM task \
              INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
              WHERE task.agency = agency.id \
              AND   taskvolumerecord.channel = 'face-to-face' \
            ), \
            ( \
              SELECT SUM(taskvolumerecord.count) as transactions_received_other_count \
              FROM task \
              INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
              WHERE task.agency = agency.id \
              AND   taskvolumerecord.channel = 'other' \
            ), \
            ( \
              SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) as transactions_with_outcome_count \
              FROM task \
              INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
              WHERE task.agency = agency.id \
            ), \
            ( \
              SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) as transactions_with_users_intended_outcome_count \
              FROM task \
              INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
              WHERE task.agency = agency.id \
            ) \
     FROM agency \
     INNER JOIN task ON task.agency = agency.id \
     INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
     ";

    if (department) {
      sql += "INNER JOIN department ON department.id = agency.department \
              WHERE department.friendly_id = '{department}'\
             ";
      sql = sql.replace(/{department}/, department)
    }
    sql += "GROUP BY agency.id, agency.name \
      ORDER BY transactions_received_count DESC \
      ";

    return this.app.orm.Agency.query(
      sql,
      []
    );
  }
}