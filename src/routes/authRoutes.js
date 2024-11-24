const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

router.post('/signup', 
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    signup
);

router.post('/login', 
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').exists().withMessage('Password is required')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    login
);

module.exports = router;
