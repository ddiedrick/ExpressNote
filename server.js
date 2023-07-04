const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const PORT = 3002;
const apiRoutes = require('./routes/apiRoutes');
const homeRoutes = require('./routes/homeRoute')

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
//include routes 
app.use(homeRoutes);
app.use(apiRoutes);


// sets specific local port to send app to
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
