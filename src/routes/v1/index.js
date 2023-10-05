const express = require('express');
const { AuthRequestValidator } = require('../../middleware/index');
const userController = require('../../controllers/user-controller');

const router = express.Router();

router.post(
    '/signup', 
    AuthRequestValidator.validateUserAuth, 
    userController.create
);
router.post(
    '/signin', 
    AuthRequestValidator.validateUserAuth, 
    userController.signIn
);

router.get(
    '/isAuthenticated',
    userController.isAuthenticated
)


module.exports = router;