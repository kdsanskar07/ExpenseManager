const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./src/graphql/schema');
const graphQlResolvers = require('./src/graphql/resolvers/index')
const isAuth = require('./middleware/is-auth');
require('./config/db');
const config = require('./config/config')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
}))

app.listen(config.development.port, () => {
    console.log("Server is up and running at Port",config.development.port)
})


