import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type RoleType = "Admin" | "User";

export interface IUser extends Document {
  username: string;
  email: string;
  avatar: string;
  password: string;
  collections: Schema.Types.ObjectId[];
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
        default: [],
      },
    ],
    role: {
      type: String,
      required: true,
      default: "User",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;

    next();
  }
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
