const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       POST /api/users
// @desc        Register a user
// @access      Public
router.post(
   '/',
   [
      check('name', 'Enter a name')
         .not()
         .isEmpty(),
      check('email', 'Enter a valid email').isEmail(),
      check('password', 'Min 6 characters').isLength({ min: 6 })
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      try {
         let user = await User.findOne({ email });

         if (user) {
            res.status(400).json({ msg: 'User already exists' });
         }
         user = new User({
            name,
            email,
            password
         });
         const salt = await bcrypt.genSalt(10);

         user.password = await bcrypt.hash(password, salt);
         await user.save();

         const payload = {
            user: {
               id: user.id
            }
         };

         jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
               expiresIn: 3600000
            },
            (error, token) => {
               if (error) throw error;
               res.json({ token });
            }
         );
      } catch (error) {
         console.error(error.message);
         res.status(500).send('Server error');
      }
   }
);

module.exports = router;
