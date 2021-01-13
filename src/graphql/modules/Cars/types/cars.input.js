import {
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLBoolean,
} from "graphql";
const GearEnumType = new GraphQLEnumType({
  name: "GearEnumType",
  values: {
    Automatic: {
      value: "Automatic",
    },
    Manual: {
      value: "Manual",
    },
  },
});
const MileageEnumType = new GraphQLEnumType({
  name: "MileageEnumType",
  values: {
    miles: {
      value: "miles",
    },
    kilometers: {
      value: "kilometers",
    },
  },
});
const CarInputType = {
  owner: { type: new GraphQLNonNull(GraphQLID) },
  brand: { type: new GraphQLNonNull(GraphQLString) },
  model: { type: new GraphQLNonNull(GraphQLString) },
  year: { type: new GraphQLNonNull(GraphQLString) },
  gearType: {
    type: new GraphQLNonNull(GearEnumType),
  },
  mileage: { type: new GraphQLNonNull(GraphQLInt) },
  mileageUnit: { type: new GraphQLNonNull(MileageEnumType) },
  color: { type: new GraphQLNonNull(GraphQLString) },
  leather: { type: new GraphQLNonNull(GraphQLBoolean) },
};

export { CarInputType, MileageEnumType, GearEnumType };
