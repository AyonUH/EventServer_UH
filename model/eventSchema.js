const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventsDataSchema = new Schema({
  event: String,
  parameters: String,
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
