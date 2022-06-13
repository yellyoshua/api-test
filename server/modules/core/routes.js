import { request, response } from "express";
import mongoose from "mongoose";

export default (app, model, path) => {
  const find = async (req = request, res = response) => {
    const response = await model.find(req.query);

    res.status(200).json({ response, errors: []});
  };

  const create = async (req = request, res = response) => {
    const response = await model.create(req.body);

    res.status(201).json({ response, errors: []});
  };

  const update = async (req = request, res = response) => {
    try {
      const response = await model.update(req.body);

      res.status(200).json({ response, errors: []});
    } catch (error) {
      if (error instanceof mongoose.Error.CastError)
        return res.status(400).json({ response: null, errors: [{ message: "Invalid id" }]});
      res.status(500).json({ response: null, errors: [{ message: error.message }]});
    }
  };

  const remove = async (req = request, res = response) => {
    const response = await model.remove(req.query);
    res.status(200).json({ response, errors: []});
  }

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
  }

  return {
    setup,
  };
}
