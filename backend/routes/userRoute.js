const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { handleAsyncFunction } = require('../utils/commonHelper');
const { hasAccess } = require('../middlewares/authMiddleware');
const { ENTITIES, ACTION_TYPES } = require('../constants');

router.get('/', hasAccess(ENTITIES.USER, ACTION_TYPES.READ), handleAsyncFunction(userController.getUsers));

router.post('/', hasAccess(ENTITIES.USER, ACTION_TYPES.CREATE), handleAsyncFunction(userController.createUser));

router.get('/roles',
    // hasAccess(ENTITIES.USER, ACTION_TYPES.CREATE),
    handleAsyncFunction(userController.getUserRoles)
);

router.get('/:id',
    hasAccess(ENTITIES.USER, ACTION_TYPES.READ),
    handleAsyncFunction(userController.getUser)
);

router.put('/:id',
    hasAccess(ENTITIES.USER, ACTION_TYPES.UPDATE),
    handleAsyncFunction(userController.updateUser)
);

router.delete('/:id',
    hasAccess(ENTITIES.USER, ACTION_TYPES.DELETE),
    handleAsyncFunction(userController.deleteUser)
);

module.exports = router;
