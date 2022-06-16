import mongoose from 'mongoose';
import model from '../../model.js';

const testStudentSchema = new mongoose.Schema({
  name: String
}, {collection: 'test_profiles_collection'});

const students = mongoose.model('test_profiles_collection', testStudentSchema);

export default model(students);
