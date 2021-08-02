const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type UserExpense {
        totalIncome: Int!
        totalExpense: Int!
    }
    type ResponseMsg{
        msg:String!
    }
    type AuthData {
        id: ID!
        token: String!
        tokenExpiration: String!
    }
    type Transaction {
        title: String!
        amount: Int!
        note: String!
        date: String!
        tag:String!
        type:String!
    }
    type Weekly {
        week1: Int!
        week2: Int!
        week3: Int!
        week4: Int!
    }
    type Categorically {
        food: Int!
        fuel: Int!
        others: Int!
        shopping: Int!
        home: Int!
    }
    type Report {
        weekly: Weekly!
        categorically:Categorically!
    }
    type Dashboard {
        transaction : [Transaction!]  
        userExpense : UserExpense!
    }
    input UserInput {
        name: String!
        email: String!
        password: String!
    }
    input AuthInput {
        email:String!
        password: String!
    }
    input TransactionInput {
        title: String!
        note: String!
        amount: Int!
        date: String!
        tag: String!
        type: String!
    }
    type RootQuery {
        login(authInput: AuthInput): AuthData!
        transaction: [Transaction!]
        report: Report!
        dashboard : Dashboard!
    }
    type RootMutation {
        createUser(userInput: UserInput): AuthData!
        createTransaction(transactionInput: TransactionInput): ResponseMsg!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
