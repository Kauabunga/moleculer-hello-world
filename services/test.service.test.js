const { expect } = require('@jest/globals');
const { ServiceBroker } = require('moleculer');
const { ValidationError } = require('moleculer').Errors;
const TestService = require('./test.service');

describe('Unit test via service', () => {
  const broker = new ServiceBroker();

  beforeAll(async () => {
    broker.createService(TestService);
    return broker.start();
  });

  afterAll(async () => broker.stop());

  it('should say hello', async () => {
    const text = await broker.call('test.hello', { name: 'Moleculer' });

    expect(text).toEqual('Hello Moleculer');
  });

  it('should fail to say hello when no name is passed', async () => {
    await expect(broker.call('test.hello', { name: null })).rejects.toEqual(
      new ValidationError('Parameters validation error!')
    );
  });
});
