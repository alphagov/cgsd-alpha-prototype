'use strict'

const Service = require('trails-service')

/**
 * @module DefaultService
 *
 * @description Default Service included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/services}
 * @this TrailsApp
 */
module.exports = class DefaultService extends Service {

  /**
   * Return some info about this application
   */
  getApplicationInfo() {
    const trailpacks = []
    Object.keys(this.app.packs).forEach(packName => {
      if (packName != 'inspect') {
        const pack = this.app.packs[packName]
        trailpacks.push({
          name: pack.name,
          version: pack.pkg.version
        })
      }
    })
    return {
      app: this.app.pkg.version,
      node: process.version,
      libs: process.versions,
      trailpacks: trailpacks
    }
  }

  organisationType(record) {
    if (record.hasOwnProperty('department')) {
      return 'agency'
    } else {
      return 'department'
    }
  }

  pct_of(number1, number2) {
    return Math.floor((number1 / number2) * 100);
  }

  to3SF(number) {
    if (number >= 1000000) {
      return (number / 1000000) + 'm'
    } else {
      return Math.floor((number / 1000)) + 'k'
    }
  }
}
