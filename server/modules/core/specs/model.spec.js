/* eslint-disable max-lines-per-function */
import {afterEach, beforeEach, describe, expect, it} from '@jest/globals';
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
      expect(data[0].name).toEqual('Maria');
      expect(data[0].surname).toEqual('Ivanova');
      expect(data[1].name).toEqual('Paula');
      expect(data[1].surname).toEqual('Bernal');
    });
  
    it('should paginate data', async () => {
      const data = await testing_model.find({}, {page: 1, perPage: 2});
      expect(data.length).toEqual(2);
      expect(data[0].name).toEqual('Maria');
      expect(data[0].surname).toEqual('Ivanova');
      expect(data[1].name).toEqual('Paula');
      expect(data[1].surname).toEqual('Bernal');
    });

    it('should paginate to last page', async () => {
      const data = await testing_model.find({}, {page: 3, perPage: 2});
      expect(data.length).toEqual(2);
      expect(data[0].name).toEqual('Melanie');
      expect(data[1].name).toEqual('Paulina');
    });

    it('should return specific fields selected', async () => {
      const data = await testing_model.find({}, {select: 'name,age'});
      expect(data.length).toEqual(6);
      expect(data[0].name).toEqual('Maria');
      expect(data[0].age).toEqual(20);
      expect(data[0].surname).toBeUndefined();
      expect(data[1].name).toEqual('Paula');
      expect(data[1].age).toEqual(21);
      expect(data[1].surname).toBeUndefined();
    });

    it('should return data populated', async () => {
      const data = await testing_model.find({}, {populate: 'profile'});
      expect(data.length).toEqual(6);
      expect(data[0].name).toEqual('Maria');
      expect(data[0].profile.username).toEqual('maria');
      expect(data[0].profile.bio).toEqual('I am a programmer');

      expect(data[1].name).toEqual('Paula');
      expect(data[1].profile.username).toEqual('paula');
      expect(data[1].profile.bio).toEqual('I am a designer');
    });

    it('should non return data when in the filter pass a non exist property', async () => {
      const data = await testing_model.find({
        non_exist_property: 'non_exist_value'
      });

      expect(data.length).toEqual(0);
    });
  });

  describe('when delete', () => {
    it('should delete data', async () => {
      const data = await testing_model.remove({_id: '62a7510ae202f37187187252'});
      const dataFound = await testing_model.find({_id: '62a7510ae202f37187187252'});

      expect(data.name).toEqual('Paula');
      expect(data.surname).toEqual('Bernal');
      expect(data.age).toEqual(21);
      expect(data.profile.toString()).toEqual('63a7510ae202f37187187252');
      expect(dataFound.length).toEqual(0);
    });

    it('should dont delete data', async () => {
      const data = await testing_model.remove({name: 'Maria'});
      expect(data).toBeNull();
    });
  });

  describe('when create', () => {
    it('should create data', async () => {
      const data = await testing_model.create({
        name: 'New name for test',
        surname: 'New surname for test'
      });
      
      const dataFound = await testing_model.find({
        _id: data._id
      });

      expect(dataFound[0].name).toEqual('New name for test');
      expect(dataFound[0].surname).toEqual('New surname for test');
    });
  });

  describe('when update', () => {
    it('should update data', async () => {
      await testing_model.update({
        _id: '62a7510ae202f37187187252',
        name: 'New Paula 2.0'
      });

      const newData = await testing_model.find({
        _id: '62a7510ae202f37187187252'
      });

      expect(newData[0].name).toEqual('New Paula 2.0');
      expect(newData[0].surname).toEqual('Bernal');
    });
  });

  describe('when delete', () => {
    it('should delete a data by _id', async () => {
      const data = await testing_model.remove({
        _id: '62a7510ae202f37187187252'
      });
      const dataFound = await testing_model.find({
        _id: '62a7510ae202f37187187252'
      });

      expect(dataFound.length).toEqual(0);
      expect(data.name).toEqual('Paula');
      expect(data.surname).toEqual('Bernal');
      expect(data.age).toEqual(21);
    });

    it('should dont delete data', async () => {
      const data = await testing_model.remove({name: 'Maria'});
      expect(data).toBeNull();
    });
  });
});
