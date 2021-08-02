const User = require('../../models/user');
const utils = require('../../../lib/utils');

module.exports = {
  createUser: async (args, req) => {
    console.log(args);
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const saltHash = utils.genPassword(args.userInput.password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;
      const newUser = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        totalIncome: 0,
        totalExpense: 0,
        hash: hash,
        salt: salt
      });
      const result = await newUser.save();
      const tokenObject = utils.issueJWT(result._id);
      return { id: result._id, token: tokenObject.token, tokenExpiration: tokenObject.expires };
    } catch (error) {
      throw new Error(error);
    }
  },


  login: async (args, req) => {
    console.log(args);
    const user = await User.findOne({ email: args.authInput.email });
    console.log(user);
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isvalid = utils.validPassword(args.authInput.password, user.hash, user.salt);
    if (isvalid) {
      const tokenObject = utils.issueJWT(user.id);
      return { id: user.id, token: tokenObject.token, tokenExpiration: tokenObject.expires };
    } else {
      throw new Error('Password is incorrect!');
    }
  }
};