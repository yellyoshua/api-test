const composeQuery = (query) => {
  const filter = {};
  const params = {};

  Object.keys(query).forEach((key) => {
    if (key.startsWith('__')) {
      params[key.slice(2)] = query[key];
    } else {
      filter[key] = query[key];
    }
  });

  return {filter, params};
};

export default (app, model, path) => {
  const find = async (req, res) => {
    const {filter, params} = composeQuery(req.query);
    const response = await model.find(filter, params);

    res.status(200).json({response, errors: []});
  };

  const create = async (req, res) => {
    const response = await model.create(req.body);

    res.status(201).json({response, errors: []});
  };

  const update = async (req, res) => {
    const response = await model.update(req.body);
    res.status(200).json({response, errors: []});
  };

  const remove = async (req, res) => {
    const response = await model.remove(req.query);
    res.status(200).json({response, errors: []});
  };

  const setup = (operations = {}) => {
    if (operations.get) {
      app.get(path, find);
    }

    if (operations.post) {
      app.post(path, create);
    }

    if (operations.put) {
      app.put(path, update);
    }

    if (operations.delete) {
      app.delete(path, remove);
    }
  };

  return {
    setup
  };
};
