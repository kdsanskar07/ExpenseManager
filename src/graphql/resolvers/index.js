const authResolver = require('./auth');
const transactionResolver = require('./transaction')

const rootResolver = {
  ...authResolver,
  ...transactionResolver
};

module.exports = rootResolver;