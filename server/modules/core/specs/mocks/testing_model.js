import mongoose from 'mongoose';
import model from '../../model.js';

const testUserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  age: Number,
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'test_profiles_collection'
  }
}, {collection: 'testing_collection'});

const users = mongoose.model('testing_collection', testUserSchema);

export default model(users);
