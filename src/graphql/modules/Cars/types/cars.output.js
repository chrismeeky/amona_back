import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
} from "graphql";
import { GearEnumType, MileageEnumType } from "./cars.input";
const PurposeEnumType = new GraphQLEnumType({
  name: "PurposeEnumType",
  values: {
    hirepurchase: { value: 0 },
    rent: { value: 1 },
  },
});
const StatusEnumType = new GraphQLEnumType({
  name: "StatusEnumType",
  values: {
    available: { value: 0 },
    sold: { value: 1 },
    rented: { value: 2 },
  },
});
const IntervalUnitType = new GraphQLEnumType({
  name: "IntervalUnitType",
  values: {
    month: { value: 0 },
    week: { value: 1 },
    year: { value: 2 },
  },
});
const CarOutputType = new GraphQLObjectType({
  name: "CarOutputType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    owner: { type: new GraphQLNonNull(GraphQLID) },
    location: { type: GraphQLID },
    pictures: { type: GraphQLID },
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
    location: { type: GraphQLString },
    purpose: { type: PurposeEnumType },
    active: { type: GraphQLBoolean },
    status: { type: StatusEnumType },
    description: { type: GraphQLString },
    promoted: { type: GraphQLBoolean },
    interval: { type: GraphQLInt },
    intervalUnit: { type: IntervalUnitType },
    remittance: { type: GraphQLInt },
    date: { type: GraphQLString },
  }),
});

export { CarOutputType };
