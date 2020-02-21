var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const requiredNumber = {
      type: Number,
      required: true,
  }

var logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    visitedDate: {
      required: true,
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema)

module.exports = LogEntry;