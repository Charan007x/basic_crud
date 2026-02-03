const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Here are your notes!!');
});

router.post('/', (req, res) => {
    res.status(201).send('Note created successfully!!');
});
router.put('/:id', (req, res) => {
    res.status(200).send('Note updated successfully!!');
});

router.delete('/:id', (req, res) => {
    res.status(200).send('Note deleted successfully!!');
});
 router.get('/test',(req,res)=>{
    res.send('Test login');
 });
module.exports = router;