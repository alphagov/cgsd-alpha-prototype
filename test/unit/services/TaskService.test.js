'use strict'
/* global describe, it */

const assert = require('assert')

describe('TaskService', () => {
  it('should exist', () => {
    assert(global.app.api.services['TaskService'])
  })
})
