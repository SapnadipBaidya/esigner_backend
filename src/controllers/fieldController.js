import Field from "../models/Field.js"; // Make sure to include .js extension

export async function createField(req, res) {
  try {
    const field = await Field.create(req.body);
    res.json({ success: true, field });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function createOrUpdateMultipleFieldsByTemplateId(req, res) {
  try {
    const { templateId, fields } = req.body;
    if (!templateId || !Array.isArray(fields)) {
      return res.status(400).json({ error: "templateId and fields[] are required" });
    }

    // Ensure templateId is an ObjectId if passed as string
    // const mongooseTemplateId = mongoose.Types.ObjectId(templateId);

    // Collect upserted fields
    const upsertedFields = [];

    for (const field of fields) {
      // Upsert by templateId + id
      const filter = { templateId, id: field.id };
      const update = {
        ...field,
        templateId, // Ensure always set
      };
      // { upsert: true, new: true } => create if not exist, return new doc
      const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
      const upserted = await Field.findOneAndUpdate(filter, update, opts).lean();
      upsertedFields.push(upserted);
    }

    return res.json({
      success: true,
      fields: upsertedFields
    });
  } catch (err) {
    console.error("Error in createOrUpdateMultipleFieldsByTemplateId:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getFieldsByTemplateId(req, res) {
  try {
    const templateId = req.params.templateId || req.query.templateId || req.body.templateId;
    if (!templateId) {
      return res.status(400).json({ error: "templateId is required" });
    }

    const fields = await Field.find({ templateId }).lean();
    return res.json({ success: true, fields });
  } catch (err) {
    console.error("Error in getFieldsByTemplateId:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}