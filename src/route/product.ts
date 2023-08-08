import express from 'express';
import ProductController from '../controller/product';
import auth from '../middleware/auth'

const router = express.Router();

router.get('/', auth,ProductController.getproduct);

router.post('/add', ProductController.createProduct);
router.patch('/update/:id', ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

export default router;
