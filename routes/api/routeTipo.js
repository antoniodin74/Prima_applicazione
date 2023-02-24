const express = require('express');
const router = express.Router();
const {getTipo, getTipobyId, deleteTipo, addTipo, updateTipo} = require('../../controllers/controllerTipo');
const {getTipoPrincipale} = require('../../controllers/controllerPrincipale');

/* router.all('*', (req, res, next)=>{
    console.log('sono un middleware');
    next();
}); */

router.get('/', async (req, res)=>{
    //res.send('principale');
    //res.json(getTipo());
    try {
        const result = await(getTipo());
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:id([0-9]+)', async (req, res)=>{
    //res.send('principale con id ' + req.params.id);
    //const result = getTipobyId(req.params.id)
    //res.status(result? 200: 404).json(result? result:null);
    try {
        //console.log(req.params.id);
        const result = await getTipobyId(req.params.id);
        res.status(result? 200:404).json(result? result:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:tipo_id([0-9]+)/principale', async (req, res)=>{
    //res.send('principale con id ' + req.params.id);
    //const result = getTipobyId(req.params.id)
    //res.status(result? 200: 404).json(result? result:null);
    try {
        //console.log(req.params.tipo_id);
        const result = await getTipoPrincipale(req.params.tipo_id);
        res.status(result? 200:404).json(result? result:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.delete('/:id([0-9]+)', async (req, res)=>{
    //const deleted = deleteTipo(req.params.id);
    //res.status(deleted? 200: 404).json(deleted? deleted:null);
    try {
        const deleted = await deleteTipo(req.params.id);
        res.status(deleted? 200: 404).json(deleted? deleted:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post('/', async (req, res)=>{
    console.log(req.body.tipo);
    //res.json(addTipo(req.body.tipo));
    try {
        const result = await addTipo(req.body.tipo);
        res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.patch('/:id([0-9]+)', async (req, res)=>{
    console.log(req.body.tipo, req.params.id);
    /* const updTipo = updateTipo(req.params.id, req.body.tipo)
    res.status(updTipo? 200: 404).json(updTipo? updTipo: ' Record non trovato'); */
    try {
        const result = await updateTipo(req.params.id, req.body.tipo);
        res.status(result? 200: 404).json(result? result:'Record non trovato');
        //res.json(result);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});


module.exports = router;