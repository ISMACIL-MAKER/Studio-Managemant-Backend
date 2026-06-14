import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  studioName: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:['superadmin', 'studio_admin'],
    default:"studio_admin",
  },
  studioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio' }
}, { timestamps: true });

export default mongoose.model('UserCustomer', userSchema);