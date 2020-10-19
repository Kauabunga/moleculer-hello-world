module.exports = {
  name: 'test',

  actions: {
    hello: {
      params: { name: 'string' },
      handler(ctx) {
        return `Hello ${ctx.params.name}`;
      },
    },
  },
};
