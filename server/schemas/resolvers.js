const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { input }) => {
            return User.findOne({ input });
        }
    },
    Mutation: {
        createUser: async (parent, { body }) => {
            const user = await User.create({ body });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { body }) => {
            const user = await User.findOne({ body });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, )
    }
};

module.exports = resolvers;