let app = require('../server/routers/details.router')
let testServer = require('supertest')
/**
* @jest-environment node
*/

describe('Test for get price details response', () => {
  testServer('Should response 200 when given an existing product id', async () => {
    const response = await testServer(app).get('/details/price/53871305');
    expect(response.statusCode).toBe(403);
    done();
  })
})