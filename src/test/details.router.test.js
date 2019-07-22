let app = require('../../server/server')
let testServer = require('supertest')

// testing for getting price details by id
describe('Test for get price details response', () => {
  test('Should respond 200 when given an existing product id', async () => {
    const response = await testServer(app).get('/details/price/53871305');
    await expect(response.statusCode).toBe(200);
  })
  test('Should respond with empty array when given a non-existing product id', async () => {
    const response = await testServer(app).get('/details/price/15117729');
    await expect(response.text).toBe("[]");
  })
  test('Should respond with empty array when given an existing product id with no stored price', async () => {
    const response = await testServer(app).get('/details/price/53971309');
    await expect(response.text).toBe("[]");
  })
});


// testing for getting name details by id
describe('Test for get name details response', () => {
  test('Should respond 200 when given an existing product id', async () => {
    const response = await testServer(app).get('/details/name/53871305');
    await expect(response.statusCode).toBe(200);
  })
  test('Should respond 500 when given a non-existing product id', async () => {
    const response = await testServer(app).get('/details/name/15117729');
    await expect(response.statusCode).toBe(500);
  })
  test('Should respond with empty array when given an existing product id with no stored price', async () => {
    const response = await testServer(app).get('/details/name/53971309');
    await expect(response.text).toBe("Maternity Striped Short Sleeve Shirred V-Neck T-Shirt - Isabel Maternity by Ingrid & Isabel");
  })
});

// testing for updating price details by id
describe('Test for get name details response', () => {
  test('Should respond 201 when given an existing product id to update', async () => {
    const response = await testServer(app).put('/details/price', { id: 53871305, price: 12 });
    await expect(response.statusCode).toBe(201);
  })
});