const { body } = require('express-validator');

const prisma = require('../../prisma/client')

const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Email is Invalid')
        .custom(async (value) => {
            if (!value) {
                throw new Error('Email is required');
            }
            const user = await prisma.user.findUnique({ where: { email: value } });
            if (user) {
                throw new Error('Email already taken');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 100 characters long'),
];

const validateLogin = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password is required')
]

module.exports = { validateRegister, validateLogin };
