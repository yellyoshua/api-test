/* eslint-disable max-lines-per-function */
import database from '../../utils_for_specs/database.js';
import testing_model from './mocks/testing_model.js';
import './mocks/test_profiles_model.js';

describe('model', () => {
  beforeEach(async () => {
    await database.clearAndLoad([
      `${__dirname}/fixtures/test_profiles_collection.js`,
      `${__dirname}/fixtures/testing_collection.js`
    ]);
  });

  afterEach(async () => {
    await database.close();
  });

  describe('when find', () => {
    it('should return all data', async () => {
      const data = await testing_model.find();
      expect(data.length).toBe(6);
    });

    it('should paginate', async () => {
      const data = await testing_model.find({}, {page: 2, perPage: 2});
      expect(data.length).toBe(2);
      expect(data[0].name).toBe('data3');
      expect(data[1].name).toBe('data4');
    });

    it('should return specific fields selected', async () => {
      const data = await testing_model.find({}, {select: 'name,age'});
      expect(data.length).toBe(6);
      expect(data[0].name).toBe('data1');
      expect(data[0].age).toBe(20);
      expect(data[0].surname).toBeUndefined();
      expect(data[0].profile).toBeUndefined();

      expect(data[1].name).toBe('data2');
      expect(data[1].age).toBe(21);
      expect(data[1].surname).toBeUndefined();
      expect(data[1].profile).toBeUndefined();
    });

    it('should return data populated', async () => {
      const data = await testing_model.find({}, {populate: 'profile'});
      expect(data.length).toBe(6);
      expect(data[0].profile.name).toBe('profile1');
      expect(data[1].profile.name).toBe('profile2');
      expect(data[2].profile.name).toBe('profile3');
      expect(data[3].profile.name).toBe('profile4');
      expect(data[4].profile.name).toBe('profile5');
      expect(data[5].profile.name).toBe('profile6');
    });

    it('should non return data when in the filter pass a non exist property', async () => {
      const data = await testing_model.find({
        non_exist_property: 'non_exist_value'
      });

      expect(data.length).toBe(0);
    });
  });

  describe('when create', () => {
    it('should create data', async () => {
      await testing_model.create({
        name: 'data100',
        surname: 'data100_surname'
      });
      
      const data = await testing_model.find({
        name: 'data100'
      });

      expect(data.length).toBe(1);
      expect(data[0].name).toBe('data100');
      expect(data[0].surname).toBe('data100_surname');
    });
  });

  describe('when update', () => {
    it('should update data', async () => {
      await testing_model.update({
        _id: '62a7510ae202f37187187252',
        name: 'new_data2'
      });

      const newData = await testing_model.find({
        _id: '62a7510ae202f37187187252'
      });

      expect(newData[0].name).toBe('new_data2');
      expect(newData[0].surname).toBe('data2_surname');
    });

    it('should non update data when not provide the _id', () => {
      expect(testing_model.update({
        name: 'new_data2'
      })).rejects.toThrow('_id is required');
    });
  });

  describe('when delete', () => {
    it('should delete a data by _id', async () => {
      await testing_model.remove({
        _id: '62a7510ae202f37187187252'
      });
      const data = await testing_model.find({
        _id: '62a7510ae202f37187187252'
      });

      expect(data.length).toBe(0);
    });

    it('should rejects when not pass a _id property', () => {
      expect(testing_model.remove({
        name: 'DataNotExist'
      })).rejects.toThrow('_id is required');
    });
  });
});
