import * as MagicLinkService from '../services/magicLink.service.js';

// Hardcoded demo data (swap for DB/query data later)
const demoData = {
  templateId: 'temp1234',
  contractId: 'cont5678',
  userId: 'user4321',
  role:'signer'
};

export const generate = (req, res) => {
  const magicLink = MagicLinkService.createMagicLink(demoData);
  res.json({ magicLink });
};

export const verify = (req, res) => {
  const { token } = req.query;
  const result = MagicLinkService.verifyMagicLink(token);
  if (!result.valid) {
    return res.status(200).json({
      status: result.expired ? 'expired' : 'invalid',
      message: result.expired ? 'Link expired' : 'Invalid link'
    });
  }
  res.json({ status: 'valid', data: result.data });
};

export const regenerate = (req, res) => {
  // Optionally: add checks for identity/role/old token
  const magicLink = MagicLinkService.createMagicLink(demoData);
  res.json({ magicLink });
};
