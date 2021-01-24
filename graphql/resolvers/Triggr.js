const { AuthenticationError, UserInputError } = require("apollo-server");

const { validateTriggrInputs } = require("../../util/validators");
const Triggr = require("../../models/Triggr");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getTriggrs(_, args, context) {
      const user = checkAuth(context);

      try {
        const triggr = await Triggr.find({ user: user.id }).sort({
          createdAt: -1,
        });

        return triggr;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getTriggr(_, { triggrId }) {
      try {
        const triggr = await Triggr.findById(triggrId);
        if (triggr) {
          return triggr;
        } else {
          throw new Error("Triggr not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createTriggr(_, { name }, context) {
      const user = checkAuth(context);

      const { errors, valid } = validateTriggrInputs(name);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const triggrNameExists = await Triggr.findOne({ name });
      if (triggrNameExists) {
        errors.nameExists = "This name exists";
        throw new UserInputError("Errors", { errors });
      }

      const newTriggr = new Triggr({
        name,
        count: 0,
        lastEventTime: "Has not been triggered",
        lastLocation: "No location yet",
        url: "Add a url",
        status: false,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const triggr = await newTriggr.save();

      return triggr;
    },

    async deleteTriggr(_, { triggrId }, context) {
      const user = checkAuth(context);

      try {
        const triggr = await Triggr.findById(triggrId);
        if (user.username === triggr.username) {
          await triggr.delete();
          return "Triggr deleted.";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async editTriggr(_, { triggrId, name, metaData, url }, context) {
      const user = checkAuth(context);

      try {
        const triggr = await Triggr.findById(triggrId);
        if (user.username === triggr.username) {
          //check if name exists
          const triggrNameExists = await Triggr.findOne({
            name: name,
            username: user.username,
          });
          if (triggrNameExists) {
            throw new UserInputError("Triggr name is taken");
          }

          // update based on input

          return (
            {
              ...triggr._doc,
              id: triggr._id,
              name: name ? name : triggr.name,
              count: metaData ? triggr.count + 1 : triggr.count,
              date: metaData ? new Date().toISOString() : triggr.lastEventTime,
              location: metaData ? metaData : triggr.lastLocation,
              url: url ? url : triggr.url,
              status: metaData ? !triggr.status : triggr.status,
            },
            "Triggr updated."
          );

          //errors
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
