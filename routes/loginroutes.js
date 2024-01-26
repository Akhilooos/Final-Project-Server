const express = require('express');
const router = express.Router();
const model = require('../model/menotrmodel');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password match an admin user
        if (email === 'admin@gmail.com' && password === '12345') {
            const token = jwt.sign({ role: 'admin' }, 'your-secret-key');
            res.send({ role: 'admin', token });
        } else {
            // Check if the email matches a mentor user in the database
            const mentor = await model.findOne({ email });

            if (mentor) {
                const token = jwt.sign({ role: 'mentor', mentorId: mentor.mentorId }, 'your-secret-key');
                // Send the mentor object
                res.json({ role: 'mentor', mentorId: mentor.mentorId, token });
            } else {
                res.json({ role: 'invalid' });
            }
        }
    } catch (error) {
        console.error('There was an error!', error);
        res.status(500).json({ role: 'error' });
    }
});

module.exports = router;
