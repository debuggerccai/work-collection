// users 模型
import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', UserSchema)
