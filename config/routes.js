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
   * Render the prototype-v0 home page
   */
  {
    method: 'GET',
    path: '/prototype-v0',
    handler: 'ViewController.departmentVersionHome'
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
