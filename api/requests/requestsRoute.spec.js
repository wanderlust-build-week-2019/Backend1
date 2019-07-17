const express = require('express');
const server = require('./../../server.js');
const db = require('../../data/dbConfig');
// const generateToken = require('./../../auth/generateToken');
const request = require('supertest');

describe('server.js', () => {
  afterEach( async () => {
    await db('requests').truncate();
  });

  describe('get /requests', () => {
    it('should return all requests in db', async () => {
      let newRequest = {
        id: 1,
        "is_private": 0,
        "duration": 2,
        "tour_id": 1,
        "user_id": 2,
        }

      await db('requests').insert(newRequest);

      const res = await request(server).get('/api/requests');
      expect(res.body[0]).toEqual(newRequest);
    }); 
  })
  describe('get /requests/:id', () => {
    it('should return the first tour from the db', async () => {
      let newRequest = {
        id: 1,
        "is_private": 0,
        "duration": 2,
        "tour_id": 1,
        "user_id": 2,
        }

        await db('requests').insert(newRequest);      

      const response = await request(server).get('/api/requests/1');

      expect(response.body).toEqual(newRequest);
    }); 
  })

})