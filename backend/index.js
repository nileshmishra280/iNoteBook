const connectToMongoose = require('./db');
const express = require('express');
const cors = require('cors'); // Correct the import statement

connectToMongoose(); 
const app = express();
const port = 4000

app.use(cors()); // Use cors middleware
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook backend running at http://localhost:${port}`);
});
