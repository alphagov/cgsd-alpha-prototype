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
   * Show the home page
   */
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.home'
  },

  /**
   * Redirect based on search term
   */
  {
    method: 'GET',
    path: '/search',
    handler: 'ViewController.search'
  },

  /**
   * Show information about a service, agency or department
   */
  {
    method: 'GET',
    path: '/performance-data/:friendly_id',
    handler: 'ViewController.performanceView'
  },

  /**
   * List departments in UK Government
   */
  {
    method: 'GET',
    path: '/performance-data/government',
    handler: 'ViewController.government'
  },

  /**
   * List agencies in UK Government or for a department
   */
  {
    method: 'GET',
    path: '/performance-data/agencies',
    handler: 'ViewController.agencies'
  },
  
  /**
   * List services in UK Government or for a department or agency
   */
  {
    method: 'GET',
    path: '/performance-data/services',
    handler: 'ViewController.services'
  },

  /**
   * Show the search page
   */
  {
    method: 'GET',
    path: '/performance-data/searchpage',
    handler: 'ViewController.searchpage'
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
