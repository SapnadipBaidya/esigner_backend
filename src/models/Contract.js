import mongoose from 'mongoose';

const AssignedSignerSchema = new mongoose.Schema({
  signerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,
  isSigned: { type: Boolean, default: false },
  signedAt: Date,
});

const FieldDataSchema = new mongoose.Schema({
  fieldId: String, // but this is id in Field schema not the _id
  signerId: mongoose.Schema.Types.ObjectId,
  value: String,
  signed: Boolean,
  signedAt: Date,
});

const ContractSchema = new mongoose.Schema({
  contractName: { type: String, required: true }, 
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'sent', 'partially_signed', 'completed'], default: 'draft' },
  assignedSigners: [AssignedSignerSchema],
  fieldData: [FieldDataSchema],
  filledPdfPath: String,
}, { timestamps: true });

export default mongoose.model('Contract', ContractSchema);
