import mongoose from "mongoose";

const FieldSchema = new mongoose.Schema({}, { _id: false, strict: false });


const TemplateSchema = new mongoose.Schema({
  templateId: { type: String, required: true },
  templateName: { type: String, required: true },
  pdfPath: { type: String },
  fields: {
    type: Map,
    of: FieldSchema
  }
}, {
  timestamps: true,
  collection: "templates"
});

const Templates = mongoose.model("Templates", TemplateSchema);
export default Templates;
