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
        const parsedFields = fields.replace(/\+/ug, ' ');
        console.log(parsedFields);
        mongooseQuery.populate(parsedFields);
      }
    }
  };
};
