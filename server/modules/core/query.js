export default (mongooseQuery) => {
  return {
    paginate (page, perPage) {
      if (page && perPage) {
        const skip = (page - 1) * perPage;

        mongooseQuery.skip(skip).limit(perPage);
      }
    },
    populate (fields) {
      if (fields) {
        const parsedFields = fields.replace(/,/ug, ' ');
        mongooseQuery.populate(parsedFields);
      }
    },
    select (fields) {
      if (fields) {
        const parsedFields = fields.replace(/,/ug, ' ');
        mongooseQuery.select(parsedFields);
      }
    }
  };
};
