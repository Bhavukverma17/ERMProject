// seedEngineerUsers.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const MONGO_URI = "mongodb://127.0.0.1:27017/er_management";

const seedEngineerUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing engineer users
    await User.deleteMany({ role: "Engineer" });

    const engineerUsers = [
      {
        userId: 201,
        name: "Alex Johnson",
        email: "alex.johnson@company.com",
        password: await bcrypt.hash("alex123", 10),
        role: "Engineer"
      },
      {
        userId: 202,
        name: "Sarah Chen",
        email: "sarah.chen@company.com",
        password: await bcrypt.hash("sarah123", 10),
        role: "Engineer"
      },
      {
        userId: 203,
        name: "Michael Brown",
        email: "michael.brown@company.com",
        password: await bcrypt.hash("michael123", 10),
        role: "Engineer"
      },
      {
        userId: 204,
        name: "Emma Wilson",
        email: "emma.wilson@company.com",
        password: await bcrypt.hash("emma123", 10),
        role: "Engineer"
      },
      {
        userId: 205,
        name: "David Kumar",
        email: "david.kumar@company.com",
        password: await bcrypt.hash("david123", 10),
        role: "Engineer"
      },
      {
        userId: 206,
        name: "Sophia Martinez",
        email: "sophia.martinez@company.com",
        password: await bcrypt.hash("sophia123", 10),
        role: "Engineer"
      },
      {
        userId: 207,
        name: "James Wilson",
        email: "james.wilson@company.com",
        password: await bcrypt.hash("james123", 10),
        role: "Engineer"
      },
      {
        userId: 208,
        name: "Olivia Lee",
        email: "olivia.lee@company.com",
        password: await bcrypt.hash("olivia123", 10),
        role: "Engineer"
      },
      {
        userId: 209,
        name: "Daniel Park",
        email: "daniel.park@company.com",
        password: await bcrypt.hash("daniel123", 10),
        role: "Engineer"
      },
      {
        userId: 210,
        name: "Isabella Garcia",
        email: "isabella.garcia@company.com",
        password: await bcrypt.hash("isabella123", 10),
        role: "Engineer"
      },
      {
        userId: 211,
        name: "Ethan Thompson",
        email: "ethan.thompson@company.com",
        password: await bcrypt.hash("ethan123", 10),
        role: "Engineer"
      },
      {
        userId: 212,
        name: "Ava Anderson",
        email: "ava.anderson@company.com",
        password: await bcrypt.hash("ava123", 10),
        role: "Engineer"
      }
    ];

    await User.insertMany(engineerUsers);
    console.log("✅ Engineer users inserted");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting engineer users:", err);
    process.exit(1);
  }
};

seedEngineerUsers(); 