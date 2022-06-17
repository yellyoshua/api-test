import database from '../../utils_for_specs/database.js';
import request from '../../utils_for_specs/request.js';
import users_routes from '../users_routes.js';

describe('users routes', () => {
  beforeEach(async () => {
    await database.clearAndLoad([
      `${__dirname}/fixtures/users.js`
    ]);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('GET /users', () => {
    it('should return the total of users', async () => {
      const data = await request(users_routes).get();

      expect(data.status).toBe(200);
      expect(data.errors).toEqual([]);
      expect(data.response.length).toBe(4);
      expect(data.response[0].username).toBe('data1');
      expect(data.response[0].email).toBe('data1@mail.com');
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      await request(users_routes).post({
        username: 'new_data1',
        email: 'new_data1@mail.com'
      });

      const data = await request(users_routes).get({
        username: 'new_data1'
      });

      expect(data.status).toBe(200);
      expect(data.errors).toEqual([]);
      expect(data.response.length).toBe(1);
    });  
  });

  describe('PUT /users', () => {
    it('should update a user', async () => {
      await request(users_routes).put({
        _id: '6a0b8f8f0f8b81b8e8b456e8',
        username: 'new_data1_updated'
      });
      const data = await request(users_routes).get({
        username: 'new_data1_updated'
      });

      expect(data.status).toBe(200);
      expect(data.errors).toEqual([]);
      expect(data.response.length).toBe(1);
    });
  });

  describe('DELETE /users', () => {
    it('should delete a user', async () => {
      await request(users_routes).delete({
        _id: '5a0b8f8f0f8b81b8e8b456e8'
      });

      const data = await request(users_routes).get({
        _id: '5a0b8f8f0f8b81b8e8b456e8'
      });

      expect(data.status).toBe(200);
      expect(data.errors).toEqual([]);
      expect(data.response.length).toBe(0);
    });
  });
});
