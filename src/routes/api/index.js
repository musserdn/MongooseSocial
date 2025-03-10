import { Router } from 'express';
import { thoughtsRouter } from './thoughtsRoutes.js';
import { userRouter } from './userRoutes.js';

const router = Router();

router.use('/thoughts', thoughtsRouter);
router.use('/users', userRouter);

export default router;