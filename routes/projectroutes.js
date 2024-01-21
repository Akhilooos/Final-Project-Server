const express = require('express');
const router = express.Router();

router.use(express.json());

const Project = require('../model/projectmodel'); 
router.use(express.urlencoded({extended:true}));

// POST a new project
router.post('/add', async (req, res) => {
  try {
    const { projectId, topic } = req.body;

    // Check if projectId already exists
    const existingProject = await Project.findOne({ projectId });
    if (existingProject) {
      return res.status(400).json({ message: 'Project with the same ID already exists' });
    }

    // Create a new project with the provided projectId
    const newProject = new Project({
      projectId,
      topic,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('mentors').populate('submissions');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a project by id
router.get('/:projectId', async (req, res) => {
    try {
      const project = await Project.findOne({ projectId: req.params.projectId }).populate('mentors').populate('submissions');
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// PUT update a project by id
router.put('/update/:projectId', async (req, res) => {
    try {
      const updatedProject = await Project.findOneAndUpdate({ projectId: req.params.projectId }, req.body, { new: true });
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(updatedProject);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// DELETE a project by id
router.delete('/remove/:projectId', async (req, res) => {
    try {
      const deletedProject = await Project.findOneAndDelete({ projectId: req.params.projectId });
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(deletedProject);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;

