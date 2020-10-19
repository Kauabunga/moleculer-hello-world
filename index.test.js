const { afterAll, expect } = require('@jest/globals');
const express = require('express');
const request = require('supertest');
const [broker, gatewayService] = require('./index.js');

describe('Unit test via gateway', () => {
  let app = express();

  beforeAll(async () => {
    app.use(gatewayService.express());
    return broker.start();
  });

  afterAll(async () => broker.stop());

  it('should say hello', async () => {
    const response = await request(app).get('/api/hi?name=Moleculer').expect(200);

    expect(response.text).toEqual('"Hello Moleculer"');
  });

  it('should fail to say hello when no name is passed', async () => {
    const response = await request(app).get('/api/hi').expect(422);

    expect(response.text).toEqual('Route error: Parameters validation error!');
  });
});
