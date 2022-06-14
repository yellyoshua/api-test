import {describe, it, expect, jest } from '@jest/globals';
import routes from '../routes.js';

describe('routes', () => {
  it('should handle get request', async () => {
    const appMock = {
      get: jest.fn(),
    };
    const modelMock = {
      find: jest.fn().mockResolvedValue([
        { _id: "1", name: "test" },
      ]),
    };

    const routesInstance = routes(appMock, modelMock, "/api");
    routesInstance.setup({ get: true });

    const reqMock = {
      query: {
        name: "test",
      },
    };
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    expect(appMock.get).toHaveBeenCalled();
    expect(appMock.get).toHaveBeenCalledWith("/api", expect.any(Function));

    await appMock.get.mock.lastCall[1](
      reqMock,
      resMock,
    );

    expect(modelMock.find).toHaveBeenCalled();
    expect(modelMock.find).toHaveBeenCalledWith(
      {
        name: "test",
      },
      {}
    );

    expect(resMock.status).toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(200);

    expect(resMock.json).toHaveBeenCalled();
    expect(resMock.json).toHaveBeenCalledWith({
      response: [
        { _id: "1", name: "test" },
      ],
      errors: [],
    });
  });
});
