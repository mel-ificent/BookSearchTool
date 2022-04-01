const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
  Mutation: {
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, body) => {
      const user = await User.create(body);
      const token = signToken(user);
  
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
  
      return { token, user };
    },

 // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a book from `savedBooks`
  async removeBook({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },
  },
};

module.exports = resolvers;