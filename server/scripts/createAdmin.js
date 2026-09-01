// server/scripts/createAdmin.js
// One-time admin seeder. Run: node scripts/createAdmin.js

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const MONGODB_URI = process.env.DB || process.env.MONGODB_URI;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in server/.env");
  process.exit(1);
}
if (!MONGODB_URI) {
  console.error("DB (or MONGODB_URI) must be set in server/.env");
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    mainrole: { type: String, default: "user" },
    subscription: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdmin() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected.");

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (existing) {
    existing.password = hashedPassword;
    existing.role = "admin";
    existing.mainrole = "superadmin";
    existing.name = "Shravan Kumar";
    await existing.save();
    console.log("Admin account UPDATED for: " + ADMIN_EMAIL);
  } else {
    await User.create({
      name: "Shravan Kumar",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      mainrole: "superadmin",
    });
    console.log("Admin account CREATED for: " + ADMIN_EMAIL);
  }

  console.log("Admin setup complete! Login with: " + ADMIN_EMAIL);
  await mongoose.disconnect();
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error("Error creating admin:", err);
  mongoose.disconnect();
  process.exit(1);
});
