const express = require("express");
const app = express();
const path = require('path');


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Anything that doesn't match the above, send back index.js
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/myapp/index.js'))
  });


const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));