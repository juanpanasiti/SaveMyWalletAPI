import { Router } from 'express';

import * as creditCardsController from '../controllers/credit-cards.controllers';
import * as handlers from './handlers/credit-cards.handlers';
import * as partnerHandlers from './handlers/partners.handlers';

const router = Router({});
router.all('*', handlers.commons);

// Routes for Credit Cards C.R.U
router.post('/', handlers.create, creditCardsController.createCreditCard);

router.get('/', handlers.getAll, creditCardsController.getAllPaginated);

router.get('/:id', handlers.getOne, creditCardsController.getOneCreditCardById);

router.put('/:id', handlers.editOne, creditCardsController.editOneCreditCardById);

router.delete('/:id', handlers.deleteOne, creditCardsController.deleteOneCreditCard);

// CRUD routes for Partners related to a Credit Card
router.post('/:id/partners', partnerHandlers.addNew, creditCardsController.addOrEditCCPartner);

router.put('/:id/partners', partnerHandlers.editOne, creditCardsController.addOrEditCCPartner);

router.delete(
    '/:id/partners/:partnerId',
    partnerHandlers.deleteOne,
    creditCardsController.deletePartner
);

export default router;
