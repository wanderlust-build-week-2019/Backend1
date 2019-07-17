const express = require('express');
const server = require('./../../server.js');
const db = require('../../data/dbConfig');
const generateToken = require('./../../auth/generateToken');
const request = require('supertest');

describe('server.js', () => {
  afterEach( async () => {
    await db('tours').truncate();
  });

  describe('get /tours', () => {
    it('should return all tours in db', async () => {
      let tours = [
        { id: 1, type: 'sight seeing', location: 'myrtle beach', max_duration: 3, user_id: 1 },
        { id: 2, type: 'adventure', location: 'miami', max_duration: 3, user_id: 1 }]

      await db('tours').insert(tours);

      const res = await request(server).get('/api/tours');
      expect(res.body).toEqual(tours);
    }); 
  })
  describe('get /tours/:id', () => {
    it('should return the first tour from the db', async () => {
      let tour = {
        id: 1,
        type: "sight seeing",
        location: "myrtle beach",
        max_duration: 3,
        user_id: 1
        }

        await db('tours').insert(tour);      

      const response = await request(server).get('/api/tours/1');

      expect(response.body).toEqual(tour);
    }); 
  })

  describe('post /tours', () => {
    
    // doesnt work
  xit('responds with 201 when post', async function() {
    const user = {
        username: 'bob',
        role_id: 1,
        user_id: 1
    }
    const tour = {
      "type": "sight seeing",
      "location": "myrtle beach",
      "max_duration": 3,
      "user_id": user.user_id
      }
    const token = generateToken(user);    

    const res = await request(server)
        .post("/api/tours")
        .send(tour)
        .set('Accept', 'application/json')
        .set('Authorization', token);        

    expect(res.status).toBe(201);
    expect(res.body.location).toBe('myrtle beach')

  });
  })

  // these tests only work when validateAbility middleware is taken off
  // the endpoint
  describe('delete /tours/:id', () => {
    
    xit('should show correct message when user is removed', async () => {
      let tour = {type: 'adventure', location: 'miami', max_duration: 3, user_id: 1 }
      const user = {
        username: 'bob',
        role_id: 1,
        user_id: 1
    }
    const token = generateToken(user);    

    await db('tours').insert(tour);

    const res = await request(server)
        .del('/api/tours/1')
        .send(tour)
        .set('Accept', 'application/json')
        .set('Authorization', token);   

      expect(res.status).toBe(200);
      expect(res.body).toEqual('Tour was removed');
    }); 
    
    xit('should show correct message when tour doesnt exist', async () => {
      const user = {
        username: 'bob',
        role_id: 1,
        user_id: 1
    }
    const token = generateToken(user);    

      const res = await request(server)
        .del('/api/tours/3')
        .set('Accept', 'application/json')
        .set('Authorization', token);         

      expect(res.status).toBe(404);
      expect(res.body).toEqual({message: 'The tour could not be found'});
    }); 

  })

})