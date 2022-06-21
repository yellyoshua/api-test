import database from '../../utils_for_specs/database.js';
import request from '../../utils_for_specs/request.js';
import total_routes from '../total_routes.js';

describe('Total routes', () => {
  const routes_request = request(total_routes);

  beforeEach(async () => {
    await database.clearAndLoad([
      `${__dirname}/fixtures/users.js`,
      `${__dirname}/fixtures/students.js`
    ]);
  });

  afterEach(async () => {
    await database.close();
  });

  it('should test the implementation in routes setup', () => {
    expect(routes_request.route_path).toBe('/totals');
    expect(routes_request.route_methods.get).toHaveBeenCalled();
    expect(routes_request.route_methods.post).not.toHaveBeenCalled();
    expect(routes_request.route_methods.put).not.toHaveBeenCalled();
    expect(routes_request.route_methods.delete).not.toHaveBeenCalled();
  });

  describe('GET /totals', () => {
    let req_query = {};

    beforeEach(() => {
      req_query = {};
    });

    it('should return the total number of users', async () => {
      req_query.users = true;
      const response = await routes_request.get('/totals', req_query);

      expect(response.total).toBe(4);
    });

    it('should return the total number of students', async () => {
      req_query.students = true;
      const response = await routes_request.get('/totals', req_query);

      expect(response.total).toBe(3);
    });

    it('should return the total number of users and students', async () => {
      const response = await routes_request.get('/totals', req_query);

      expect(response.total).toBe(7);
    });
  });
});
