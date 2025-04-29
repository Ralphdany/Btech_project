import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Ensure indexes are properly set
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ name: 1 }, { unique: false });

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Drop existing indexes before creating the model
mongoose.connection.on("connected", async () => {
  if (mongoose.connection.db) {
    try {
      await mongoose.connection.db.collection("users").dropIndex("name_1");
    } catch (error) {
      // Ignore error if index doesn't exist
      console.log("Index drop error (can be ignored):", error);
    }
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
