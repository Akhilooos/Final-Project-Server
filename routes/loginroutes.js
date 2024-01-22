const express = require('express');
const router = express.Router();
const model = require('../model/menotrmodel');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password match an admin user
        if (email === 'admin@gmail.com' && password === '12345') {
            res.send({ role: 'admin' });
        } else {
            // Check if the email matches a mentor user in the database
            const mentor = await model.findOne({ email });

            if (mentor) {
                // Send the mentor object
                res.json({ role: 'mentor', mentorId: mentor.mentorId });
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

