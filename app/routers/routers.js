import express from 'express';

import authenticateController from '../controllers/authenticate';
import userController from '../controllers/user';

const apiRouters = express.Router();

apiRouters
  .use(authenticateController.verify)

  // authenticate
  .post('/authenticate', authenticateController.authenticate)

  // router about users
  .get('/users', userController.findAll)
  .get('/setup', userController.setup)

module.exports = apiRouters;