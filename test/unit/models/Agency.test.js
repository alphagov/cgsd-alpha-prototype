'use strict'
/* global describe, it */

const assert = require('assert')

describe('Agency Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Agency'])
  })
})
