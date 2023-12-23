const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const offerSchema = mongoose.Schema(
  {
    freelancerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Freelancer',
      required: true,
    },
    clientId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Client',
      required: true,
    },
    jobId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
      required: true,
    },
    proposalId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    status: {
      type: String,
      enum: ['progress', 'canceled', 'pending', 'completed'],
      default: 'pending',
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
offerSchema.plugin(toJSON);
offerSchema.plugin(paginate);

/**
 * @typedef Offer
 */
const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
