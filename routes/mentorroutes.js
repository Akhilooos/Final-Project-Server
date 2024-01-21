const express = require('express');
const router = express.Router();

router.use(express.json());

const Mentor = require('../model/menotrmodel'); 
router.use(express.urlencoded({extended:true}));

// GET all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a mentor by id
router.get('/:mentorId', async (req, res) => {
    try {
      const mentor = await Mentor.findOne({ mentorId: req.params.mentorId });
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
      res.json(mentor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  

router.post('/add', async (req, res) => {
  try {
    const { mentorId } = req.body;

    // Check if mentorId already exists
    const existingMentor = await Mentor.findOne({ mentorId });
    if (existingMentor) {
      return res.status(400).json({ message: 'Mentor with the same ID already exists' });
    }

    const newMentor = new Mentor(req.body);
    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a mentor by id
router.put('/update/:mentorId', async (req, res) => {
  try {
    const updatedMentor = await Mentor.findOneAndUpdate({ mentorId: req.params.mentorId }, req.body, { new: true });
    if (!updatedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(updatedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// DELETE a mentor by id
router.delete('/remove/:mentorId', async (req, res) => {
  try {
    const deletedMentor = await Mentor.findOneAndDelete({ mentorId: req.params.mentorId });
    if (!deletedMentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(deletedMentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
