const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const offerSchema = mongoose.Schema(
  {
    freelancerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Freelancer',
      required: true,
    },
    jobId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
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
