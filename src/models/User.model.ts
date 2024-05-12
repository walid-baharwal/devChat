import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface User extends Document {
  username: string;
  password: string;
  fullName: string;
  profilePicture: string;
  isPasswordCorrect: (password: string) => Promise<boolean>;
}

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "FullName is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture:{
        type: String,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  this: User,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;
