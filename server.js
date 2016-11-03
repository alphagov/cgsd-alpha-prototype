/**
 * @module server
 *
 * Start up the Trails Application.
 */

'use strict'

const cfenv = require("cfenv")
const appEnv = cfenv.getAppEnv()

const app = require('./')
const TrailsApp = require('trails')
const server = new TrailsApp(app)

server.start().catch(err => server.stop(err))
