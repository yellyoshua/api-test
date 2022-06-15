/* eslint-disable global-require */
import mongoose from 'mongoose';

export default {
  clearAndLoad: async (fixturesData) => {
    await mongoose.connect('mongodb+srv://idukay:idukay@cluster0.xv4ii.mongodb.net/idukay-induction-specs?retryWrites=true&w=majority');
    const db = mongoose.connections[0].db;
    for (const fixture of fixturesData) {
      const collectionName = fixture.split('/').pop().replace('.js', '');
      const data = require(fixture).default;
      const collection = db.collection(collectionName);
      await collection.deleteMany();
      await collection.insertMany(data);
    }
  },
  close: async () => {
    await mongoose.connection.close();
  }
};
