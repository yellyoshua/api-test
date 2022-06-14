import routes from '../core/routes.js';
import students_model from './students_model.js';

export default (app) => {
  const route = routes(app, students_model, '/students');

  route.setup({
    get: true,
    post: true,
    put: true,
    delete: true
  });
};
