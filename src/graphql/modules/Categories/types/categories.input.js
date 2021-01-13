import { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID } from "graphql";

const CategoryInputType = {
  _id: { type: GraphQLID },
  title: { type: new GraphQLNonNull(GraphQLString) },
  description: { type: GraphQLString },
  thumbnail: { type: new GraphQLNonNull(GraphQLString) },
  count: { type: GraphQLInt },
};

const CategoryUpdateInputType = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  thumbnail: { type: GraphQLString },
  count: { type: GraphQLInt },
};



export { CategoryInputType, CategoryUpdateInputType };
