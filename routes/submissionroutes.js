const express = require('express');
const router = express.Router();
const Submission = require('../model/submissionmodel'); 

// GET all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a submission by submissionId
router.get('/:submissionId', async (req, res) => {
  try {
    const submission = await Submission.findOne({ submissionId: req.params.submissionId });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new submission
router.post('/add', async (req, res) => {
  try {
    const { submissionId } = req.body;

    // Check if submissionId already exists
    const existingSubmission = await Submission.findOne({ submissionId });
    if (existingSubmission) {
      return res.status(400).json({ message: 'Submission with the same ID already exists' });
    }

    const newSubmission = new Submission(req.body);
    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a submission by submissionId
router.put('/update/:submissionId', async (req, res) => {
  try {
    const updatedSubmission = await Submission.findOneAndUpdate({ submissionId: req.params.submissionId }, req.body, { new: true });
    if (!updatedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(updatedSubmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a submission by submissionId
router.delete('/remove/:submissionId', async (req, res) => {
  try {
    const deletedSubmission = await Submission.findOneAndDelete({ submissionId: req.params.submissionId });
    if (!deletedSubmission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(deletedSubmission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
