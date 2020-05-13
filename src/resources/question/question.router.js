import { Router } from 'express';
import controllers from './question.controllers';

const router = Router();

// /api/question
router
  .route('/')
  .get(controllers.getAllForAll)
  .post(controllers.createOne);

// /api/question/:qno
router.route('/:qno').get(controllers.getOneForAll);

export default router;
