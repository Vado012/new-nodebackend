import e from 'express';
import {createcomment,  deleteComment, updateComment, getAllComment} from '../controller/commentController.js';
const router = e.Router();

router.post('/:blogId',createcomment)      
router.get('/allcomments', getAllComment)
router.delete('/:id', deleteComment)
router.put('/:id', updateComment)

export default router;