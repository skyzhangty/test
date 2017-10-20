/* eslint-disable import/no-extraneous-dependencies,strict */

'use strict';

const getResourceHandler = require('backend-middleware/src/handlers/resource.getter');

const handlers = {
	studyTeamFolder: getResourceHandler,
	publicFolder: getResourceHandler,
};

module.exports = handlers;
