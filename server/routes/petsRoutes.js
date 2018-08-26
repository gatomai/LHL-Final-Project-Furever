import express from 'express';

import PetsSerializer from '../serializers/pets';
import petfinder from '../api/petfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAll();

    const jsonOutput = PetsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  router.get('/test', async (req, res) => {
    const result = await dataHelpers.returnAll();

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/newuser', async (req, res) => {
    const result = await dataHelpers.insertNewUserDemo();

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/finduser', async (req, res) => {
    const result = await dataHelpers.getUserDetails('test');

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/populate', async (req, res) => {
    const options = {
      location: 'toronto,ontario',
      output: 'full'
    };
    try {
      const result = await petfinder('pet.find', options);

      const output = await dataHelpers.insertMultiplePets(result);
      res.json(output);
    } catch (e) {
      console.log('Error', e);
      res.json(e);
    }
  });

  return router;
};
