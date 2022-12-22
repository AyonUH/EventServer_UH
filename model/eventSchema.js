const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventsDataSchema = new Schema({
  event: String,
  parameters: String,
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
    default: "Event",
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

const eventData = new model("event", eventsDataSchema);
module.exports = eventData;
