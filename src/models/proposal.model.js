const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const proposalSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
proposalSchema.plugin(toJSON);
proposalSchema.plugin(paginate);

/**
 * @typedef Proposal
 */
const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
