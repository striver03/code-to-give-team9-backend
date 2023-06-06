const express = require('express');
const router = express.Router();

const {
    getAllUsersData,
    getUserData,
    addUserData,
    updateUserData,
    deleteUserData
} = require('../controllers/crud_functions');

router.route('/').get(getAllUsersData);
router.route('/create').post(addUserData);
router.route('/:id').get(getUserData).patch(updateUserData).delete(deleteUserData);

module.exports = router;