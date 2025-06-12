// controllers/assignmentController.js
const Assignment = require('../models/Assignment');
const Engineer = require('../models/Engineers');

const createAssignmentAndAssignToEngineer = async (req, res) => {
  const { 
    projectId,
    engineerId,
    engineerName,
    startDate,
    endDate,
    status,
    allocatedHours,
    role,
    tasks
  } = req.body;

  try {
    // Validate required fields
    if (!projectId || !engineerId || !engineerName || !startDate || !endDate || !allocatedHours || !role) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["projectId", "engineerId", "engineerName", "startDate", "endDate", "allocatedHours", "role"]
      });
    }

    // Find the engineer by user_id
    const engineer = await Engineer.findOne({ user_id: engineerId });
    if (!engineer) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    // Create new assignment
    const assignment = new Assignment({
      assignmentId: `ASS-${Date.now()}`, // Generate unique assignment ID
      projectId,
      engineerId,
      engineerName,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: status || 'Planning',
      allocatedHours: parseInt(allocatedHours),
      role,
      tasks: Array.isArray(tasks) ? tasks : [tasks],
      progress: 0
    });

    await assignment.save();

    // Update engineer's assignments using the correct ID
    await Engineer.findByIdAndUpdate(engineer._id, {
      $push: { assignment_ids: assignment._id },
      currently_assigned: true,
      project_assigned: projectId
    });

    res.status(201).json({ 
      message: 'Assignment created and assigned to engineer', 
      assignment 
    });
  } catch (error) {
    console.error("❌ Error creating assignment:", error);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const getAssignmentsByEngineer = async (req, res) => {
  const { engineerId } = req.params;

  try {
    // Find the engineer by user_id
    const engineer = await Engineer.findOne({ user_id: engineerId });
    if (!engineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }

    // Find all assignments for this engineer
    const assignments = await Assignment.find({ engineerId });
    
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: 'No assignments found for this engineer' });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error("❌ Error fetching assignments:", error);
    res.status(500).json({ 
      message: 'Server Error',
      error: error.message 
    });
  }
};

module.exports = {
  createAssignmentAndAssignToEngineer,
  getAssignmentsByEngineer
};
