import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
} from "graphql";

const SuccessType = new GraphQLObjectType({
  name: "SuccessType",
  fields: () => ({
    success: { type: GraphQLBoolean },
    status: { type: GraphQLInt },
  }),
});

const FindByIdInputType = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
};
export { SuccessType, FindByIdInputType };
