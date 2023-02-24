const express = require('express');
const router = express.Router();
const {getUser, getUserbyId, deleteUser, addUser, updateUser} = require('../../controllers/controllerPrincipale');

router.all('*', (req, res, next)=>{
    console.log('sono un middleware');
    next();
});

router.get('/', async (req, res) =>{
    //res.send('principale');
    //res.json(getUser());
    try {
        const result = await(getUser());
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
    
});

router.get('/:id([0-9]+)', async (req, res)=>{
    //res.send('principale con id ' + req.params.id);
    //const result = getUserbyId(req.params.id);
    //res.status(result? 200:404).json(result? result:null);
    try {
        const result = await getUserbyId(req.params.id);
        res.status(result? 200:404).json(result? result:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.delete('/:id([0-9]+)', async (req, res)=>{
    //const deleted = deleteUser(req.params.id);
    //res.status(deleted? 200: 404).json(deleted? deleted:null);
    try {
        const deleted = await deleteUser(req.params.id);
        res.status(deleted? 200: 404).json(deleted? deleted:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post('/', async (req, res)=>{
    console.log(req.body);
    //res.json(addUser(req.body));
    try {
        const result = await addUser(req.body);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.patch('/:id([0-9]+)', async (req, res)=>{
    console.log(req.body, req.params.id);
    /* const updUser = updateUser(req.params.id, req.body)
    res.status(updUser? 200: 404).json(updUser? updUser: ' Record non trovato'); */
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(result? 200: 404).json(result? result:'Record non trovato');
        //res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});


module.exports = router;