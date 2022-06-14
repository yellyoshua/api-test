import {jest, describe, it, expect} from '@jest/globals';
import defaultQuery from '../query.js';

describe('', () => {
  it('should paginate', () => {
    const mongooseQueryMock = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis()
    };

    const query = defaultQuery(mongooseQueryMock);

    query.paginate(3, 3);
    expect(mongooseQueryMock.skip).toHaveBeenCalledWith(6);
    expect(mongooseQueryMock.limit).toBeCalledWith(3);
  });
  
  it('should populate', () => {
    const mongooseQueryMock = {
      populate: jest.fn().mockReturnThis()
    };

    const query = defaultQuery(mongooseQueryMock);

    query.populate('user+client');
    expect(mongooseQueryMock.populate).
    toHaveBeenCalledWith('user client');
  });
});
