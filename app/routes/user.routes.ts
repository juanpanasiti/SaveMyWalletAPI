import { Router } from 'express';
import * as userControllers from '../controllers/user.controllers';
import * as userValidators from './validators/user.validators';

const router = Router();
router.all('*', userValidators.commons);

router.get('/', userValidators.getAll, userControllers.getAllPaginated);

router.get('/:id', userValidators.getOne, userControllers.getUserById);

router.put('/:id', userValidators.update, userControllers.updateUserById);

router.delete('/:id', userValidators.deleteOne, userControllers.deleteUserById);

export default router;
