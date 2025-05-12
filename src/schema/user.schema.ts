import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    role: String,
  },
  {
    versionKey: false,
    id: true,
    timestamps: true,
  },
);

export default UserSchema;
