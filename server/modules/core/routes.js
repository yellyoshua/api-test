export default (app, model, path) => {
  const find = async (req, res) => {
    const response = await model.find(req.query);

    res.status(200).json({ response, errors: []});
  };

  const create = async (req, res) => {
    const response = await model.create(req.body);

    res.status(201).json({ response, errors: []});
  }

  const setup = (operations = {}) => {
    if (operations.get) {
      app.get(path, find);
    }

    if (operations.post) {
      app.post(path, create);
    }
  }

  return {
    setup,
  };
}
