import database from '../../utils_for_specs/database.js';
import request from '../../utils_for_specs/request.js';
import total_routes from '../total_routes.js';

describe('Total routes', () => {
  beforeEach(async () => {
    await database.clearAndLoad([
      `${__dirname}/fixtures/users.js`,
      `${__dirname}/fixtures/students.js`
    ]);
  });

  afterEach(async () => {
    await database.close();
    jest.clearAllMocks();
  });

  describe('GET /totals', () => {
    it('should return the total number of users and students', async () => {
      const data = await request(total_routes).get();

      expect(data.status).toBe(200);
      expect(data.errors).toEqual([]);
      expect(data.response.total).toBe(6);
    });
  });
});
