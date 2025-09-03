const mongoose = require('mongoose');
const { MONGO_URI } = require("../config");

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the .env file.');
  process.exit(1); // Exit the process if the URI is missing
}

// Connect to MongoDB
mongoose.connect(MONGO_URI);


//Add error handling
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:',err);
});

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB.");
});

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    email: String,
    password: String
});


const CardSchema = new mongoose.Schema({
    // Schema definition here
    name: String,
    description: String,
    interests: [String], // 'String' this accepts only one string. '[String]' this accepts an array of strings
    linkedin: String,
    twitter: String,
    instagram: String,
});

// Implemented the  Mongoose Model
const Admin = mongoose.model('Admin', AdminSchema);
const Card = mongoose.model('Card', CardSchema);

module.exports = {
    Admin,
    Card
}