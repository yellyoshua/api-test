import {describe, expect, it} from '@jest/globals';
import model from '../model.js';

describe('model', () => {
  it('should be a function', () => {
    expect(typeof model).toBe('function');
  });
});
