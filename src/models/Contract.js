import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Templates',
  },
  fields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  submittedBy: String, // optional: can be user email or id
  submittedAt: {
    type: Date,
    default: Date.now
  },
  filledPdfPath: {
  type: String
}

});

const Contract = mongoose.model("Contract", ContractSchema);
export default Contract;
