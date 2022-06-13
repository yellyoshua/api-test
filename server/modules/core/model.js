import mongoose from "mongoose";

export default (Model = mongoose.Model) => {
  const paginate = (mongooseInstance, page, limit) => {
    const perPage = limit || 10;
    const skip = page <= 0 ? 0 : (page - 1) * perPage;
    page && mongooseInstance.skip(skip).limit(perPage);
  };

  const sorteBy = (mongooseInstance, sortBy) => {
    if (!(sortBy && typeof sortBy === "string")) {
      sortBy = "_id";
    };

    let sortDirection = 1;
    if (sortBy.indexOf("-") === 0) {
      sortDirection = -1;
      sortBy = sortBy.slice(1);
    }
    mongooseInstance.sort({ [sortBy]: sortDirection });
  }

  return {
    async find(query = {}) {
      const {
        limit,
        page,
        sortBy,
        ...filter
      } = query;

      const mongooseInstance = Model.find(filter);
      limit && mongooseInstance.limit(limit);
      paginate(mongooseInstance, page, limit);
      sorteBy(mongooseInstance, sortBy);

      return mongooseInstance.lean().exec();
    },
    async create(body = {}) {
      const entity = new Model({
        ...body,
      });

      return entity.save();
    },
  };
};
