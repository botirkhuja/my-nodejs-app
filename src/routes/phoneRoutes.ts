import { Router } from 'express';
import { getPhones, createPhone, getPhoneById } from '../controllers/phoneController';

const router = Router();

router.get('/', getPhones);
router.post('/', createPhone);
router.get('/:id', getPhoneById);

export default router;