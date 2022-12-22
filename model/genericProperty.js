const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const genericPropertySchema = new Schema({
  property: String,
  slug: String,
  description: String,
  inIOS: Boolean,
  versionIOS: String,
  lastVersionIOS: String,
  dateIOS: String,
  lastVersionDateIOS: String,
  inAndroid: Boolean,
  versionAndroid: String,
  lastVersionAndroid: String,
  dateAndroid: String,
  lastVersionDateAndroid: String,
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
