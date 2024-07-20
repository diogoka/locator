import { Router } from 'express';
import { getAllPois, newPoi, deletePoi } from '../controllers/poi.controller';

export const router = Router();

router.get('/', getAllPois);
router.post('/', newPoi);
router.delete('/:id', deletePoi);
