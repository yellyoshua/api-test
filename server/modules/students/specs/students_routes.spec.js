import database from '../../utils_for_specs/database.js';
import request from '../../utils_for_specs/request.js';
import students_routes from '../students_routes.js';

describe('students_routes', () => {
  beforeEach(async () => {
    await database.clearAndLoad([
      `${__dirname}/fixtures/students.js`
    ]);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('GET /students', () => {
    it('should return the total of students', async () => {
      const data = await request(students_routes).get();

      expect(data.status).toBe(200);
      expect(data.errors).toEqual([]);
      expect(data.response.length).toBe(4);
    });
  });
});
