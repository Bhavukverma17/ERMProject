const mongoose = require("mongoose");
const Assignment = require("./models/Assignment");

const MONGO_URI = "mongodb://127.0.0.1:27017/er_management";

const seedAssignments = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing assignments
    await Assignment.deleteMany();

    const assignments = [
      {
        assignmentId: "A001",
        projectId: "P001",
        engineerId: 201,
        engineerName: "Alex Johnson",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-06-30"),
        status: "In Progress",
        allocatedHours: 40,
        role: "Lead Developer",
        tasks: ["Frontend Development", "API Integration"],
        progress: 30
      },
      {
        assignmentId: "A002",
        projectId: "P001",
        engineerId: 202,
        engineerName: "Sarah Chen",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-06-30"),
        status: "In Progress",
        allocatedHours: 20,
        role: "Backend Developer",
        tasks: ["Database Design", "API Development"],
        progress: 25
      },
      {
        assignmentId: "A003",
        projectId: "P002",
        engineerId: 203,
        engineerName: "Michael Brown",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-08-31"),
        status: "Planning",
        allocatedHours: 40,
        role: "Technical Lead",
        tasks: ["System Architecture", "Team Coordination"],
        progress: 0
      },
      {
        assignmentId: "A004",
        projectId: "P002",
        engineerId: 204,
        engineerName: "Emma Wilson",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-08-31"),
        status: "Planning",
        allocatedHours: 20,
        role: "UI/UX Developer",
        tasks: ["UI Design", "Frontend Implementation"],
        progress: 0
      },
      {
        assignmentId: "A005",
        projectId: "P003",
        engineerId: 201,
        engineerName: "Alex Johnson",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-12-31"),
        status: "Planning",
        allocatedHours: 20,
        role: "Frontend Developer",
        tasks: ["UI Development", "Integration"],
        progress: 0
      },
      {
        assignmentId: "A006",
        projectId: "P003",
        engineerId: 203,
        engineerName: "Michael Brown",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-12-31"),
        status: "Planning",
        allocatedHours: 40,
        role: "Backend Lead",
        tasks: ["System Design", "Database Migration"],
        progress: 0
      },
      {
        assignmentId: "A007",
        projectId: "P004",
        engineerId: 202,
        engineerName: "Sarah Chen",
        startDate: new Date("2024-03-15"),
        endDate: new Date("2024-07-15"),
        status: "In Progress",
        allocatedHours: 20,
        role: "Backend Developer",
        tasks: ["API Development", "Database Integration"],
        progress: 15
      },
      {
        assignmentId: "A008",
        projectId: "P004",
        engineerId: 204,
        engineerName: "Emma Wilson",
        startDate: new Date("2024-03-15"),
        endDate: new Date("2024-07-15"),
        status: "In Progress",
        allocatedHours: 20,
        role: "Frontend Developer",
        tasks: ["Mobile UI Development", "State Management"],
        progress: 20
      }
    ];

    await Assignment.insertMany(assignments);
    console.log("✅ Assignments inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting assignments:", err);
    process.exit(1);
  }
};

seedAssignments(); 