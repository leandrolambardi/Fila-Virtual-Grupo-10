const path = require('path');
const dotenv = require('dotenv');

// Único lugar donde se cargan las variables de entorno.
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
};
