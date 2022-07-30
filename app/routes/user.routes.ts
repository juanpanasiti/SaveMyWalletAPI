import { Router } from 'express';
import * as userControllers from '../controllers/user.controllers';
import * as handlers from './handlers/users.handlers';

const router = Router();
router.all('*', handlers.commons);

router.get('/', handlers.getAll, userControllers.getAllPaginated);

router.get('/:id', handlers.getOne, userControllers.getUserById);

router.put('/:id', handlers.update, userControllers.updateUserById);

router.delete('/:id', handlers.deleteOne, userControllers.deleteUserById);

export default router;
