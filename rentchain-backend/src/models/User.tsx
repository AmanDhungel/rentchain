import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber?: string;
  passwordHash: string;
  role: "tenant" | "landlord" | "agent" | "investor";
  createdAt: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) =>
          !v || validator.isMobilePhone(String(v), "any"),
        message: "Invalid phone",
      },
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["tenant", "landlord", "agent", "investor"],
      default: "tenant",
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

userSchema.statics.hashPassword = async function (
  password: string
): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

userSchema.methods.comparePassword = function (
  this: IUser,
  candidate: string
): Promise<boolean> {
  if (!this.passwordHash) return Promise.resolve(false);
  return bcrypt.compare(candidate, this.passwordHash);
};

const User =
  (mongoose.models.User as IUserModel) ||
  (mongoose.model<IUser, IUserModel>("User", userSchema) as IUserModel);
export default User;
