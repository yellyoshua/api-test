export default (routes) => {
  const resolveRequest = (method, request_data) => {
    const appMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn() 
    };

    routes(appMock);
    
    const resolveHandler = async (path, handler) => {
      const responseHandlerMock = {
        json: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis()
      };

      await handler(request_data, responseHandlerMock);
      const {response, errors} = responseHandlerMock.json.mock.calls[0][0];
      const status = responseHandlerMock.status.mock.calls[0][0];

      responseHandlerMock.json.mockClear();
      responseHandlerMock.status.mockClear();
      
      return {response, errors, status};
    };
    
    return new Promise((resolve) => {
      const [path, handler] = appMock[method].mock.calls[0];
      appMock[method].mockClear();
      resolve(resolveHandler(path, handler));
    });
  };

  return {
    async get (req_query = {}) {
      const response = await resolveRequest('get', {
        query: req_query
      });

      return response;
    },
    async post (req_body = {}) {
      const response = await resolveRequest('post', {
        body: req_body
      });

      return response;
    },
    async put (req_body = {}) {
      const response = await resolveRequest('put', {
        body: req_body
      });

      return response;
    },
    async delete (req_query = {}) {
      const response = await resolveRequest('delete', {
        query: req_query
      });

      return response;
    }
  };
};
