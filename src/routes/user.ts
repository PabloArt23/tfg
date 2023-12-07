import { Router } from 'express';
import { loginUser, newUser, getUsers } from '../controllers/user';

const router = Router();

router.post('/', newUser)
router.post('/login', loginUser)
router.get('/get', getUsers)

export default router;