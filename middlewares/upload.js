const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre del archivo subido
  }
});

// Filtro de archivo
const fileFilter = (req, file, cb) => {
  // Aceptar solo imágenes y videos
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no soportado'), false);
  }
};

// Inicializar multer con la configuración de almacenamiento y el filtro de archivo
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } // Limitar el tamaño del archivo a 10MB
});

module.exports = upload;
