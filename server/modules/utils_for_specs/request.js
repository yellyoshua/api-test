import {jest} from '@jest/globals';

export default (routes) => {
  const appMock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn() 
  };

  // eslint-disable-next-line global-require
  const routes_mock = jest.spyOn(require('../core/routes.js'), 'default');
  routes(appMock);

  const [route_methods, , route_path] = routes_mock.mock.calls[0];
  routes_mock.mockClear();

  const resolveRequest = (method, request_data, req_path) => {  
    const resolveHandler = async (path, handler) => {
      if (req_path !== path) {
        throw new Error(`path ${path} is not a route path`);
      }
      const responseHandlerMock = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis()
      };

      await handler(request_data, responseHandlerMock);
      const result = responseHandlerMock.json.mock.calls[0][0];

      responseHandlerMock.json.mockClear();
      responseHandlerMock.status.mockClear();
      
      return result.response;
    };
    
    return new Promise((resolve) => {
      const [path, handler] = appMock[method].mock.calls[0];
      resolve(resolveHandler(path, handler));
    });
  };

  return {
    async get (req_path, req_query = {}) {
      const response = await resolveRequest('get', {
        query: req_query
      }, req_path);

      return response;
    },
    async post (req_path, req_body = {}) {
      const response = await resolveRequest('post', {
        body: req_body
      }, req_path);

      return response;
    },
    async put (req_path, req_body = {}) {
      const response = await resolveRequest('put', {
        body: req_body
      }, req_path);

      return response;
    },
    async delete (req_path, req_query = {}) {
      const response = await resolveRequest('delete', {
        query: req_query
      }, req_path);

      return response;
    },
    route_methods,
    route_path
  };
};
