import { Router } from 'express';

import * as creditCardsController from '../controllers/credit-cards.controllers';
import * as ccValidators from './validators/credit-card.validators';
import * as partnerValidators from './validators/partner.validators';

const router = Router();
router.all('*', ccValidators.commons);

// Routes for Credit Cards C.R.U
router.post('/', ccValidators.create, creditCardsController.createCreditCard);

router.get('/', ccValidators.getAll, creditCardsController.getAllPaginated);

router.get('/:id', ccValidators.getOne, creditCardsController.getOneCreditCardById);

router.put('/:id', ccValidators.editOne, creditCardsController.editOneCreditCardById);

router.delete('/:id', ccValidators.deleteOne, creditCardsController.deleteOneCreditCard);

// CRUD routes for Partners related to a Credit Card
router.post('/:id/partners', partnerValidators.addNew, creditCardsController.addOrEditCCPartner);

router.put('/:id/partners', partnerValidators.editOne, creditCardsController.addOrEditCCPartner);

router.delete('/:id/partners/:partnerId', partnerValidators.deleteOne, creditCardsController.deletePartner);

export default router;
