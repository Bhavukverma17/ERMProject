const mongoose = require("mongoose");
const Engineer = require("./models/Engineers");

const MONGO_URI = "mongodb://127.0.0.1:27017/er_management";

const seedEngineers = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing engineers
    await Engineer.deleteMany();

    const engineers = [
      {
        name: "Alex Johnson",
        user_id: 201,
        email: "alex.johnson@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Full Stack",
        hours_allocated: 40,
        assignment_ids: []
      },
      {
        name: "Sarah Chen",
        user_id: 202,
        email: "sarah.chen@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Backend",
        hours_allocated: 20,
        assignment_ids: []
      },
      {
        name: "Michael Brown",
        user_id: 203,
        email: "michael.brown@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "DevOps",
        hours_allocated: 40,
        assignment_ids: []
      },
      {
        name: "Emma Wilson",
        user_id: 204,
        email: "emma.wilson@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Frontend",
        hours_allocated: 20,
        assignment_ids: []
      },
      {
        name: "David Kumar",
        user_id: 205,
        email: "david.kumar@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Full Stack",
        hours_allocated: 40,
        assignment_ids: []
      },
      {
        name: "Sophia Martinez",
        user_id: 206,
        email: "sophia.martinez@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Frontend",
        hours_allocated: 30,
        assignment_ids: []
      },
      {
        name: "James Wilson",
        user_id: 207,
        email: "james.wilson@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Backend",
        hours_allocated: 40,
        assignment_ids: []
      },
      {
        name: "Olivia Lee",
        user_id: 208,
        email: "olivia.lee@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "DevOps",
        hours_allocated: 20,
        assignment_ids: []
      },
      {
        name: "Daniel Park",
        user_id: 209,
        email: "daniel.park@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Full Stack",
        hours_allocated: 40,
        assignment_ids: []
      },
      {
        name: "Isabella Garcia",
        user_id: 210,
        email: "isabella.garcia@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Frontend",
        hours_allocated: 30,
        assignment_ids: []
      },
      {
        name: "Ethan Thompson",
        user_id: 211,
        email: "ethan.thompson@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "Backend",
        hours_allocated: 40,
        assignment_ids: []
      },
      {
        name: "Ava Anderson",
        user_id: 212,
        email: "ava.anderson@company.com",
        currently_assigned: false,
        project_assigned: null,
        domain: "DevOps",
        hours_allocated: 20,
        assignment_ids: []
      }
    ];

    await Engineer.insertMany(engineers);
    console.log("✅ Engineers inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting engineers:", err);
    process.exit(1);
  }
};

seedEngineers(); 