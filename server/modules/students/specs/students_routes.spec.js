import request from '../../utils_for_specs/request.js';
import students_routes from '../students_routes.js';

describe('students_routes', () => {
  const routes_request = request(students_routes);

  it('should test the implementation in routes setup', () => {
    expect(routes_request.route_path).toBe('/students');
    expect(routes_request.route_methods.get).toHaveBeenCalled();
    expect(routes_request.route_methods.post).toHaveBeenCalled();
    expect(routes_request.route_methods.put).toHaveBeenCalled();
    expect(routes_request.route_methods.delete).toHaveBeenCalled();
  });
});
