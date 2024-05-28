import { Router } from 'express';
import { getPhones, createPhone, getPhoneById, updatePhoneById, deletePhoneById } from '../controllers/phoneController';

const router = Router();

router.get('/', getPhones);
router.post('/', createPhone);
router.get('/:id', getPhoneById);
router.put('/:id', updatePhoneById);
router.delete('/:id', deletePhoneById);

export default router;