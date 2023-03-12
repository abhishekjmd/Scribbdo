const app = require('../index')
const express = require('express')
const serverless = require('serverless-http')
module.exports.handler = serverless(app)
