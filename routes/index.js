const express = require('express');
const { check, validationResult } = require('express-validator');
const productController = require('../controllers/productControllers');
const upload = require('../middlewares/upload'); // Importar el middleware de subida de archivos
const router = express.Router();

// Validación y manejo de errores
const validateProduct = [
  check('name').not().isEmpty().withMessage('El nombre es requerido'),
  check('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0'),
  check('description').not().isEmpty().withMessage('La descripción es requerida'),
  check('category').not().isEmpty().withMessage('La categoría es requerida'),
  check('stock').isInt({ gt: -1 }).withMessage('El stock debe ser un número entero no negativo'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/products', validateProduct, productControllers.createProduct);
router.get('/products', productControllers.getProducts);
router.get('/products/:id', productControllers.getProductById);
router.put('/products/:id', validateProduct, productControllers.updateProduct);
router.delete('/products/:id', productControllers.deleteProduct);


router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'Archivo subido con éxito', file: req.file });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
