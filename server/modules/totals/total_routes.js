import routes from '../core/routes.js';
import students_model from '../students/students_model.js';
import users_model from '../users/users_model.js';

export default (app) => {
  const model = {
    find: async (filter) => {
      let students = [];
      let users = [];

      const includeAll = !filter.students && !filter.users;

      if (includeAll || filter.students) {
        students = await students_model.find();
      }

      if (includeAll || filter.users) {
        users = await users_model.find();
      }

      return {total: students.length + users.length};
    }
  };

  const route = routes(app, model, '/totals');

  route.setup({
    get: true
  });
};
