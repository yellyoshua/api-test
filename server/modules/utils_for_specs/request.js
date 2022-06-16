export default (routes) => {
  const resolveRequest = (request) => {
    const mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };

    const resolveHandler = async (path, handler) => {
      await handler(request, mockResponse);
      const status = mockResponse.status.mock.calls[0][0];
      const {response, errors} = mockResponse.json.mock.calls[0][0];
      
      return {response, errors, status};
    };

    return new Promise((resolve) => {
      routes({
        get (path, handler) {
          resolve(resolveHandler(path, handler));
        }
      });
    });
  };

  return {
    async get (req_query = {}) {
      const response = await resolveRequest({
        query: req_query
      });

      return response;
    }
  };
};
