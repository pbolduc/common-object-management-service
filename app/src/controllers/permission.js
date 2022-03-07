const Problem = require('api-problem');

const errorToProblem = require('../components/errorToProblem');
const { getCurrentOidcId } = require('../components/utils');
const { permissionService } = require('../services');

const SERVICE = 'PermissionService';

const controller = {
  /** Searches for object permissions */
  // eslint-disable-next-line no-unused-vars
  objectPermissionSearch(req, res, next) {
    new Problem(501).send(res);
  },

  /** Returns the object permissions */
  // eslint-disable-next-line no-unused-vars
  objectPermissions(req, res, next) {
    new Problem(501).send(res);
  },

  /** Grants object permissions to users */
  async addPermissions(req, res, next) {
    try {
      // TODO: Do this kind of logic in validation layer/library instead
      if (!req.body || !Array.isArray(req.body) || !req.body.length) {
        return new Problem(422).send(res);
      }

      const oidcId = getCurrentOidcId(req.currentUser);
      const response = await permissionService.addPermissions(req.params.objId, req.body, oidcId);
      res.status(201).json(response);
    } catch (e) {
      next(errorToProblem(SERVICE, e));
    }
  },

  /** Deletes object permissions for a specific user */
  // eslint-disable-next-line no-unused-vars
  removePermissions(req, res, next) {
    new Problem(501).send(res);
  }
};

module.exports = controller;
