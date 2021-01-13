import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";

const CategoryOutputType = new GraphQLObjectType({
  name: "CategoryOutputType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    thumbnail: { type: new GraphQLNonNull(GraphQLString) },
    count: { type: GraphQLInt },
    created_at: { type: GraphQLString },
  }),
});

const CategoryOutputListType = new GraphQLObjectType({
  name: "CategoryOutputListType",
  fields: () => ({
    success: { type: GraphQLBoolean },
    status: { type: GraphQLInt },
    categories: { type: GraphQLList(CategoryOutputType) },
  }),
});

export { CategoryOutputType, CategoryOutputListType };
