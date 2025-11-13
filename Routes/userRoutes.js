import e from 'express';
import { createuser, deleteUser, getAllUsers, login, updateUser } from '../controller/usercontroller.js';
import authorize from '../middleware/authorization.js';
const router = e.Router();

router.post('/',createuser)
router.post('/login',login)
router.get('/allusers', getAllUsers)
router.delete('/:id', authorize(["admin","user"]) , deleteUser)
router.put('/:id', updateUser)

export default router;
