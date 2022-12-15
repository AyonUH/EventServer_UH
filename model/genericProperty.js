const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const genericPropertySchema = new Schema({
  property: String,
  slug: String,
  description: String,
  inIOS: Boolean,
  versionIOS: String,
  dateIOS: String,
  inAndroid: Boolean,
  versionAndroid: String,
  dateAndroid: String,
  dataType: {
    type: String,
    default: "GenericProp",
  },
  newChangesInIOS: {
    type: String,
    default: "--",
  },
  newChangesInAndroid: {
    type: String,
    default: "--",
  },
});

const genericProp = new model("genericProp", genericPropertySchema);
module.exports = genericProp;
