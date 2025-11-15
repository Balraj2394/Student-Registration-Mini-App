const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');


const app = express();


app.use(cors());
app.use(express.json());


app.use('/students', studentRoutes);


app.get('/', (req, res) => res.send('Student Registration API'));


// 404
app.use((req, res) => {
res.status(404).json({ error: 'Not found' });
});


module.exports = app;