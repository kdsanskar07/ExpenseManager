const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    salt:{
        type :String,
        required:true
    },
    totalIncome:{
        type:Number,
        required:true
    },
    totalExpense:{
        type:Number,
        required:true
    },
})

module.exports = mongoose.model('User',userSchema);