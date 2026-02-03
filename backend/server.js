const express = require('express');
const notesRoutes =require ('./src/routes/notesRoutes.js');
const app=express();

app.use('/api/notes', notesRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});