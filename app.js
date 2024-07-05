const express = require('express');
const connectDB = require('./config/database');
const productRoutes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', productRoutes);

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
