import { Router } from 'express';

import * as authControllers from '../controllers/auth.controllers';
import * as authValidators from './validators/auth.validators';

const router = Router();

router.post('/register', authValidators.register, authControllers.register);

router.post('/login', authValidators.login, authControllers.login);

router.get('/token', authValidators.token, authControllers.renewJWT);

export default router;
