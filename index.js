const { ServiceBroker } = require('moleculer');
const ApiGatewayService = require('moleculer-web');

// Create broker
const broker = new ServiceBroker({
  // transporter: 'NATS',
});

// Load test service
broker.createService(require('./services/test.service'));

// Load API Gateway
const gatewayService = broker.createService({
  mixins: ApiGatewayService,

  settings: {
    server: false,
    routes: [
      {
        aliases: {
          'GET /hi': 'test.hello',
        },

        path: '/api',

        onError(req, res, err) {
          res.setHeader('Content-Type', 'text/plain');
          res.writeHead(err.code || 500);
          res.end('Route error: ' + err.message);
        },
      },
    ],
  },
});

module.exports = [broker, gatewayService];
