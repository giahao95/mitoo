const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.DATABASE_URL);
    console.log('CONNECT SUCCESS: ', result.connection.host);
    console.log('CONNECT TIME: ', new Date(Date.now()).toLocaleString());
  } catch (error) {
    console.log('CONNECT DATABSE ERROR');
    console.log(error);
  }
};

module.exports = connectDB;
