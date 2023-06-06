const express = require('express');
const router = express.Router();

const {
    userID,
    addName,
    addAge,
    addCollegeName,
    addLocality
} = require('../controllers/personal_info');
const generateQuestion = require('../controllers/questions');

router.route('/:id/name').post(addName);
router.route('/:id/age').post(addAge);
router.route('/:id/college').post(addCollegeName);
router.route('/:id/locality').post(addLocality);
router.route('/:id/question').post(generateQuestion);

module.exports = router;