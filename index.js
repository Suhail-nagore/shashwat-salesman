require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shopRoutes.js');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Database connection
mongoose.connect("mongodb+srv://rishabh1234:EW5ibRCAbCDIt2vk@cluster0.uejtnl9.mongodb.net/NewEcommerce_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log(err);
});

// Routes
app.use('/', shopRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
