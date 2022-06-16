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
      expect(data.length).toEqual(6);
      expect(data[0].name).toEqual('data1');
      expect(data[0].surname).toEqual('data1_surname');
      expect(data[0].age).toEqual(20);
      expect(data[0].profile).not.toBeUndefined();
    });

    it('should paginate', async () => {
      const data = await testing_model.find({}, {page: 2, perPage: 2});
      expect(data.length).toEqual(2);
      expect(data[0].name).toEqual('data3');
      expect(data[1].name).toEqual('data4');
    });

    it('should return specific fields selected', async () => {
      const data = await testing_model.find({}, {select: 'name,age'});
      expect(data.length).toEqual(6);
      expect(data[0].name).toEqual('data1');
      expect(data[0].age).toEqual(20);
      expect(data[0].surname).toBeUndefined();
      expect(data[0].profile).toBeUndefined();

      expect(data[1].name).toEqual('data2');
      expect(data[1].age).toEqual(21);
      expect(data[1].surname).toBeUndefined();
      expect(data[1].profile).toBeUndefined();
    });

    it('should return data populated', async () => {
      const data = await testing_model.find({}, {populate: 'profile'});
      expect(data.length).toEqual(6);
      expect(data[0].profile.name).toEqual('profile1');
      expect(data[1].profile.name).toEqual('profile2');
      expect(data[2].profile.name).toEqual('profile3');
      expect(data[3].profile.name).toEqual('profile4');
      expect(data[4].profile.name).toEqual('profile5');
      expect(data[5].profile.name).toEqual('profile6');
    });

    it('should non return data when in the filter pass a non exist property', async () => {
      const data = await testing_model.find({
        non_exist_property: 'non_exist_value'
      });

      expect(data.length).toEqual(0);
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

      expect(data.length).toEqual(1);
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
