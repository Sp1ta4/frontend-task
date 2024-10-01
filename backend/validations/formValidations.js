const { body } = require('express-validator');

module.exports = formValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Please fill out all input fields!')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),

  body('surname')
    .trim()
    .notEmpty().withMessage('Please fill out all input fields!')
    .isLength({ min: 2 }).withMessage('Surname must be at least 2 characters long'),

  body('age')
    .trim()
    .notEmpty().withMessage('Please fill out all input fields!')
    .isInt({ min: 16 }).withMessage('Age must be at least 16'),

  body('email')
    .trim()
    .notEmpty().withMessage('Please fill out all input fields!')
    .isEmail().withMessage('Please enter a valid email address'),

  body('message')
    .trim()
    .notEmpty().withMessage('Please fill out all input fields!')
    .isLength({ min: 10, max: 255 }).withMessage('Message must be between 10 and 255 characters'),

  body('number')
    .trim()
    .notEmpty().withMessage('Please fill out all input fields!')
    .isMobilePhone().withMessage('Please enter a valid phone number'),
];
