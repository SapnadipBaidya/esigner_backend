import ContractSchema from '../models/Contract.js';



export async function createContract(req, res) {

try {
    const { templateId, adminId, assignedSigners,contractName } = req.body;
    if (!templateId || !adminId) {
      return res.status(400).json({ error: "templateId and adminId are required" });
    }
    const contract = new ContractSchema({
      templateId,
      adminId,
      assignedSigners: assignedSigners || [],
      status: 'draft',
      contractName
    });
    await contract.save();
    res.status(201).json({ success: true, contract });
  } catch (err) {
    console.error("Error creating contract:", err);
    res.status(500).json({ error: "Failed to create contract" });
  }

}


export async function findAndEditContract(req, res) {

try {
    const { contractId, templateId, fieldData } = req.body;
    if (!contractId || !templateId || !Array.isArray(fieldData)) {
      return res.status(400).json({ error: "contractId, templateId, and fieldData[] are required" });
    }
    // Find contract
    const contract = await ContractSchema.findOne({ _id: contractId, templateId });
    if (!contract) {
      return res.status(404).json({ error: "Contract not found" });
    }
    // Replace or update fieldData

    console.log("fieldData",fieldData)
    contract.fieldData = fieldData;
    await contract.save();
    res.json({ success: true, contract });
  } catch (err) {
    console.error("Error updating fields in contract:", err);
    res.status(500).json({ error: "Failed to update fields" });
  }
}


export async function getContractsByTemplateId(req, res) {
  try {
    const { templateId } = req.body; // you can use req.params if using /:templateId
    if (!templateId) {
      return res.status(400).json({ error: "templateId is required" });
    }

    // Find all contracts with the given templateId
    const contracts = await ContractSchema.find({ templateId });

    res.json({ success: true, contracts });
  } catch (err) {
    console.error("Error fetching contracts:", err);
    res.status(500).json({ error: "Failed to fetch contracts" });
  }
}
