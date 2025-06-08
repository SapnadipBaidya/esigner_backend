import mongoose from "mongoose";


const TemplateSchema = new mongoose.Schema({
  templateId: { type: String, required: true },
  templateName: { type: String, required: true },
  pdfPath: { type: String }
}, {
  timestamps: true,
  collection: "templates"
});

const Templates = mongoose.model("Templates", TemplateSchema);
export default Templates;
