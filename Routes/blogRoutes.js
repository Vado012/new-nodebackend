import e from 'express';
import { createblog, getAllblog, deleteblog, updateblog } from '../controller/blogcontroller.js';
import upload from '../middleware/upload.js';
import authorize from '../middleware/authorization.js';
const router = e.Router();

router.post('/', authorize(["admin",'user']), upload.single('image'), createblog)      
router.get('/allblogs', getAllblog)
router.delete('/:id', deleteblog)
router.put('/:id', updateblog)

export default router;