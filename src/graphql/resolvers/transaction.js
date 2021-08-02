const Transaction = require('../../models/transaction')
const User = require('../../models/user')
const { dateToString } = require('../../../lib/date')


/*

All transactions route will first check if user is authenticated or not

*/


module.exports = {

    // params {args:{},req.body:{}}
    // return all transactions by userId

    transaction: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }

        try {
            const transactionList = await Transaction.find({ creator: req.userId })
            let newTransactionList = [];
            transactionList.map(transaction => {
                newTransactionList.push({ ...transaction._doc, date: dateToString(transaction._doc.date) })
            })
            return newTransactionList;
        } catch (error) {
            throw new Error(error);
        }
    },

    // params {args:{title,amount,date,tag,type},req.body: userId}
    // creates transaction object, then update totalIncome and totalExpense in user schema

    createTransaction: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }

        const newTransaction = new Transaction({
            title: args.transactionInput.title,
            amount: args.transactionInput.amount,
            note: args.transactionInput.note,
            date: new Date(args.transactionInput.date),
            tag: args.transactionInput.tag,
            type: args.transactionInput.type,
            creator: req.userId
        });
        try {
            const result = await newTransaction.save();
            const user = await User.findById(req.userId);
            let newTotalIncome = user.totalIncome;
            let newTotalExpense = user.totalExpense;
            if (args.transactionInput.type === 'expense') {
                newTotalExpense += parseInt(args.transactionInput.amount)
                await User.findOne({ _id: req.userId }, (err, doc) => {
                    if (err) {
                        throw new Error(err);
                    }
                    doc.totalExpense = newTotalExpense;
                    doc.save();
                })
            } else {
                newTotalIncome += parseInt(args.transactionInput.amount)
                User.findOne({ _id: req.userId }, (err, doc) => {
                    if (err) {
                        throw new Error(err);
                    }
                    doc.totalIncome = newTotalIncome;
                    doc.save();
                })
            }
            return { msg: "Success" };
        } catch (error) {
            throw new Error(error);
        }
    },

    // params {args:{},req.body:{isAuth,userId}}

    report: async (args, req) => {

        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }

        try {
            let currentDate = new Date();
            let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0);
            let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 31, 23, 59, 59, 0);

            const results = await Transaction.find({ creator: req.userId })
            let thisMonthTransactions = []
            results.map(trasactionItem => {
                if (startDate <= trasactionItem.date <= endDate) {
                    thisMonthTransactions.push(trasactionItem);
                }
            })

            const categoryGraphData = {
                food: 0,
                fuel: 0,
                others: 0,
                shopping: 0,
                home: 0
            };
            const weekGraphData = {
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0
            };
            results.map(transaction => {
                categoryGraphData[transaction.tag] += parseInt(transaction.amount);
                const transactionDate = transaction.date.getDate()
                if (transactionDate < 8) {
                    weekGraphData.week1 += parseInt(transaction.amount);
                }
                else if (8 <= transactionDate && transactionDate < 15) {
                    weekGraphData.week2 += parseInt(transaction.amount);
                }
                else if (15 <= transactionDate < 22) {
                    weekGraphData.week3 += parseInt(transaction.amount);
                }
                else {
                    weekGraphData.week4 += parseInt(transaction.amount);
                }
            })
            return ({ weekly: weekGraphData, categorically: categoryGraphData });
        } catch (error) {
            throw new Error(error)
        }
    },


    dashboard: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error('Unauthenticated!')
            }
            let user = await User.find({ _id: req.userId });
            let lastFivetransaction = [];
            let results = await Transaction.find({ creator: req.userId }).sort('date');
            results.reverse();
            for (let i = 0; i < results.length; i++) {
                if (i === 5) {
                    break;
                }
                lastFivetransaction.push({ ...results[i]._doc, date: dateToString(results[i].date) });
            }
            return ({ transaction: lastFivetransaction, userExpense: { totalIncome: user[0].totalIncome, totalExpense: user[0].totalExpense } });
        }
        catch (error) {
            throw new Error(error)
        }
    },
};