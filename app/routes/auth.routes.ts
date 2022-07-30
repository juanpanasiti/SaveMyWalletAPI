import { Router } from 'express';

import * as authControllers from '../controllers/auth.controllers';
import * as handlers from './handlers/auth.handlers';

const router = Router();

router.post('/register', handlers.register, authControllers.register);

router.post('/login', handlers.login, authControllers.login);

router.get('/token', handlers.token, authControllers.renewJWT);

export default router;
