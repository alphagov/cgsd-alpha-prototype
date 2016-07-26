'use strict'
/* global describe, it */

const assert = require('assert')

describe('Department Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Department'])
  })
})
