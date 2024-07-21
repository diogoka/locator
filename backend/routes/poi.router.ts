import { Router } from 'express';
import {
    getAllPois,
    newPoi,
    deletePoi,
    updatePoi,
} from '../controllers/poi.controller';

export const router = Router();

router.get('/', getAllPois);
router.post('/', newPoi);
router.patch('/', updatePoi);
router.delete('/:id', deletePoi);
