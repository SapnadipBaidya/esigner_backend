import Templates from '../models/Templates.js';
import Template from '../models/Templates.js';
import path from 'path';

export async function getTemplateData(req, res) {
  try {
    // ✅ Support both GET and POST
    const templateId = req.query.templateID || req.body.templateID;

    if (!templateId) {
      return res.status(400).json({ error: "templateID is required" });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.json({
      success: true,
      template
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch template" });
  }
}



export async function getTemplatePDF(req, res) {
  try {
    const { id } = req.params;
    const template = await Templates.findById(id);
    if (!template || !template.pdfPath) {
      return res.status(404).json({ error: 'Template or PDF not found' });
    }

    const filePath = path.join(process.cwd(), template.pdfPath); // ✅ fixed
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error in getTemplatePDF:", error);
    res.status(500).json({ error: "Failed to fetch PDF file" });
  }
}




export async function getAllTemplateIdName(req, res) {
    try {
      // Only allow access to clients
      if (req.body.role !== 'admin') {
        return res.status(403).json({ error: "Access denied" });
      }
  
      // Get all templates, only return _id and templateName
      const templates = await Template.find({}); // fetch all documents
      console.log("templates",templates)
  
      res.json({
        success: true,
        templates: templates.map(t => ({
          id: t._id,
          name: t.templateName
        }))
      });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  }

export async function createTemplateData(req, res) {
  try {
    // Check for template name
    if (!req.body.templateName) {
      return res.status(400).json({ error: "Template name is required" });
    }
    // Check for uploaded file
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Check for templateId
    if (!req.body.templateId) {
      return res.status(400).json({ error: "templateId is required" });
    }

    // Check if templateId already exists
    const existing = await Templates.findOne({ templateId: req.body.templateId });
    if (existing) {
      return res.status(500).json({ error: "templateId already exists" });
    }

    // Create the template in MongoDB
    const newTemplate = await Templates.create({
      templateId: req.body.templateId,
      templateName: req.body.templateName,
      pdfPath: req.file.path, // stores the path to the uploaded file
      fields: new Map()
    });

    res.json({
      success: true,
      template: newTemplate,
    });
  } catch (error) {
    console.error("Error in createTemplateData:", error);
    res.status(500).json({ error: "Failed to create template" });
  }
}


  export async function updateOrCreateFieldsForTemplate(req, res) {
  try {
    const { templateID, fields } = req.body;

    if (!templateID) {
      return res.status(400).json({ error: "TemplateID is required" });
    }
    if (!fields || typeof fields !== "object") {
      return res.status(400).json({ error: "Fields data is required and must be an object" });
    }

    const template = await Templates.findById(templateID);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Replace entire fields map with new fields object
    template.fields = new Map(Object.entries(fields));

    await template.save();

    res.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error("❌ Error updating template fields:", error);
    res.status(500).json({ error: "Failed to update template fields" });
  }
}




  export async function uploadFieldAttachment(req, res) {
    try {
      const { templateId, fieldId } = req.body;
      if (!templateId || !fieldId) {
        return res.status(400).json({ error: "templateId and fieldId are required" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const template = await Templates.findById(templateId);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
  
      // Ensure field exists, or initialize it
      const field = template.fields.get(fieldId) || {};
      field.attachmentUrl = req.file.path;
      template.fields.set(fieldId, field);
  
      await template.save();
  
      res.json({
        success: true,
        message: "Attachment uploaded and field updated",
        attachmentUrl: field.attachmentUrl,
        field: template.fields.get(fieldId)
      });
    } catch (error) {
      console.error("uploadFieldAttachment error:", error);
      res.status(500).json({ error: "Failed to upload attachment" });
    }
  }