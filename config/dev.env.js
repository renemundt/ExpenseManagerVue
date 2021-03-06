'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AUTH: {
    REDIRECT: '"http://localhost:8081/callback"',
  },
  API_URL: '"http://localhost:8666/api"',
  API_URL_PROD: '"https://expensemanagerbackend.azurewebsites.net/api"',
  WEBSOCKETURL: '"ws://localhost:8666"',
})

