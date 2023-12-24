const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const jobSchema = mongoose.Schema(
  {
    clientId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    keywords: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    assigned: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'progress', 'completed', 'delivered'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
