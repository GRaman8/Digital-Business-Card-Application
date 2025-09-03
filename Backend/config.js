require('dotenv').config();

module.exports = { 
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_SIGNUP_KEY:  process.env.ADMIN_SIGNUP_KEY,    
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT  
};