import routes from '../core/routes.js';
import users_model from './users_model.js';

export default (app) => {
  const route = routes(app, users_model, '/users');

  route.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
