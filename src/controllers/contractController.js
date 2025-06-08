import Contract from '../models/Contract.js';
import fs from 'fs';
import path from 'path';


export async function submitContract(req, res) {
  try {
    const { templateId, fields, submittedBy } = req.body;

    if (!templateId || !fields) {
      return res.status(400).json({ error: "templateId and fields are required" });
    }

    const newContract = await Contract.create({
      templateId,
      fields,
      submittedBy,
    });

    res.json({ success: true, contract: newContract });
  } catch (err) {
    console.error("Error submitting contract:", err);
    res.status(500).json({ error: "Failed to submit contract" });
  }
}

export async function getFilledPdf(req, res) {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findById(contractId);
    if (!contract || !contract.filledPdfPath) {
      return res.status(404).json({ error: "Filled PDF not found" });
    }

    const filePath = path.resolve(contract.filledPdfPath);
    res.sendFile(filePath);
  } catch (error) {
    console.error("Error in getFilledPdf:", error);
    res.status(500).json({ error: "Failed to serve filled PDF" });
  }
}

export async function uploadFilledPdf(req, res) {
  try {
    const { contractId } = req.body;
    if (!contractId || !req.file) {
      return res.status(400).json({ error: "Missing contractId or file" });
    }

    const contract = await Contract.findById(contractId);
    if (!contract) return res.status(404).json({ error: "Contract not found" });

    contract.filledPdfPath = req.file.path;
    await contract.save();

    res.json({ success: true, path: contract.filledPdfPath });
  } catch (err) {
    console.error("uploadFilledPdf error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
}

export async function getContractsByTemplateId(req, res) {
  try {
    const templateId = req.params.templateId;
    if (!templateId) return res.status(400).json({ error: "Missing template ID" });

    const contracts = await Contract.find({ templateId });
    res.json({ success: true, contracts });
  } catch (err) {
    console.error("Error fetching contracts:", err);
    res.status(500).json({ error: "Failed to fetch contracts" });
  }
}
