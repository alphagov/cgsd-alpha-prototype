/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [
  /**
   * Serve GovUK static assets
   */
  {
    method: 'GET',
    path: '/govuk_modules',
    handler: {
      directory: {
        path: 'govuk_modules'
      }
    }
  },

  /**
   * Render the home page
   */
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.home'
  },

  /**
   * Search
   */
  {
    method: 'GET',
    path: '/search',
    handler: 'ViewController.search'
  },

  /**
   * Render the prototype-v0 home page
   */
  {
    method: 'GET',
    path: '/prototype-v0',
    handler: 'ViewController.prototypeV0Home'
  },

  /**
   * Render a prototype-v0 task view
   */
  {
    method: 'GET',
    path: '/prototype-v0/:dept_or_agency/:task',
    handler: 'ViewController.taskView'
  },

  /**
   * Render performance data view (department or agency)
   */
  {
    method: 'GET',
    path: '/performance-data/:dept_or_agency',
    handler: 'ViewController.performanceView'
  },

  /**
   * Render performance data view (government)
   */
  {
    method: 'GET',
    path: '/performance-data/government',
    handler: 'ViewController.govtPerformanceView'
  },

  /**
   * Constrain the DefaultController.info handler to accept only GET requests.
   */
  {
    method: [ 'GET' ],
    path: '/api/v1/default/info',
    handler: 'DefaultController.info'
  }
]
