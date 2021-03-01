const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  originalValue: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  payday: {
    type: Date,
    required: true
  },
  delayDays: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Account', AccountSchema)
