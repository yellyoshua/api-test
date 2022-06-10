export default (app, model, path) => {
  const find = async (req, res) => {
    const response = await model.find(req.query);

    res.status(200).json({ response, errors: []});
  };

  const setup = (operations = {}) => {
    if (operations.get) {
      app.get(path, find);
    }
  }

  return {
    setup,
  };
}
