'use strict'
/* global describe, it */

const assert = require('assert')

describe('Task Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Task'])
  })
})
