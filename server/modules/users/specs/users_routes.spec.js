import request from '../../utils_for_specs/request.js';
import users_routes from '../users_routes.js';

describe('users routes', () => {
  const routes_request = request(users_routes);

  it('should test the implementation in routes setup', () => {
    expect(routes_request.route_path).toBe('/users');
    expect(routes_request.route_methods.get).toHaveBeenCalled();
    expect(routes_request.route_methods.post).toHaveBeenCalled();
    expect(routes_request.route_methods.put).toHaveBeenCalled();
    expect(routes_request.route_methods.delete).toHaveBeenCalled();
  });
});
