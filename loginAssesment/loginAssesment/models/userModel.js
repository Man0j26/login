import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: Number,
  password: String,
  role: { type: String, enum: ['admin', 'user'] },
});

const User = mongoose.model('User', userSchema);

export default User;
