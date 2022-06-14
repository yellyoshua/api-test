import mongoose from 'mongoose';
import defaultQuery from './query.js';

export default (Model = mongoose.Model) => {
  return {
    async find (filter = {}, params = {}) {
      const mongooseInstance = Model.find(filter);
      const query = defaultQuery(mongooseInstance);
      query.paginate(params.page, params.perPage);
      query.populate(params.populate);
      const data = await mongooseInstance.lean().exec();

      return data;
    },
    async create (body = {}) {
      const entity = new Model({
        ...body
      });

      const data = await entity.save();

      return data;
    },
    async update (data = {}) {
      const filter = {_id: data._id};
      const mongooseInstance = Model.findOneAndUpdate(filter, data, {
        new: true
      });
      const result = await mongooseInstance.lean().exec();

      return result;
    },
    async remove (filter = {}) {
      const mongooseInstance = Model.findOneAndDelete(filter);
      const data = await mongooseInstance.lean().exec();

      return data;
    }
  };
};
