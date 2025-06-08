import mongoose from "mongoose";
const { Schema } = mongoose;

const FieldSchema = new Schema({
  templateId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Template', 
    required: true 
  },
  id: { // Changed from fieldName to match payload
    type: String,
    required: true
  },
  label: { // New field from payload
    type: String,
    required: true
  },
  type: { // Changed from fieldType to match payload
    type: String,
    enum: ['text', 'checkbox', 'signature', 'image'], // Added 'image'
    required: true
  },
  x: { // Simplified coordinates
    type: Number,
    required: true
  },
  y: { // Simplified coordinates
    type: Number,
    required: true
  },
  width: { // Simplified dimensions
    type: Number,
    required: true
  },
  height: { // Simplified dimensions
    type: Number,
    required: true
  },
  value: { // New field from payload
    type: String,
    default: ""
  },
  page: { 
    type: Number, 
    required: true 
  },
  clientField: { // New field from payload
    type: Boolean,
    default: false
  },
  imageData: { // New field from payload
    type: String,
    default: ""
  },
  imageId: { // New field from payload
    type: String
  }
}, { timestamps: true });
// Create the model
const Field = mongoose.model('Field', FieldSchema);

export default Field;  // Export the MODEL, not the Schema