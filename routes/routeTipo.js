const express = require('express');
const router = express.Router();
const tipo = require('../controllers/controllerTipo');
const principale = require('../controllers/controllerPrincipale');

router.get('/', async (req, res)=>{
    try {
        const search = (req.query.q);
        
        const result = await(tipo.getTipo(search));
        res.render('tipo', {
            tipi : result,
            showBackBotton : false,
            search,
            user : req.session.user,
            errors: req.flash('errors'),
            message: req.flash('message')
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:tipo_id([0-9]+)/edit', async (req, res)=>{
    try {
        const tipoId = req.params.tipo_id;
        const tipoObj = await(tipo.getTipobyId(tipoId));
        res.render('tipo/edit', {
            ...tipoObj,
            user : req.session.user,
            errors: req.flash('errors'),
            message: req.flash('message')
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get('/:tipo_id([0-9]+)/principale', async (req, res)=>{
    try {
        //console.log(req.params.tipo_id);
        const tipoId = req.params.tipo_id;
        const result = await principale.getTipoPrincipale(tipoId);
        //console.log(result);
        const tipoC = await tipo.getTipobyId(tipoId);
        
        res.render('index', {
            utenti : result,
            tipo : tipoC.tipo,
            user : req.session.user,
        });
        //res.status(result? 200:404).json(result? result:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.delete('/:tipo_id([0-9]+)', async (req, res)=>{
    try {
        const deleted = await tipo.deleteTipo(req.params.tipo_id);
        res.redirect('/');
        //res.status(deleted? 200: 404).json(deleted? deleted:null);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.patch('/:tipo_id([0-9]+)', async (req, res)=>{
    if(!req.body.tipo_name){
        req.flash('errors','Inserimento obbligatorio');
        res.redirect('/tipo/' + req.params.tipo_id + '/edit');
    }else{
        try {
            const tipoName = req.body.tipo_name;
            const result = await tipo.updateTipo(req.params.tipo_id, tipoName);
            req.flash('message','Tipo modificato');
            res.redirect('/');
            //res.status(deleted? 200: 404).json(deleted? deleted:null);
        } catch (e) {
            req.flash('errors', e.errors.map(ele => ele.message));
            res.status(500).send(e.toString());
        }
    }
    
});

router.post('/', async (req, res)=>{
    if(!req.body.tipo_name){
        req.flash('errors','Inserimento obbligatorio');
        res.redirect('/');
    }else{
        try {
            const tipoName = req.body.tipo_name;
            const result = await tipo.addTipo(tipoName);
            req.flash('message','Tipo aggiunta');
            res.redirect('/');
            //res.status(deleted? 200: 404).json(deleted? deleted:null);
        } catch (e) {
            req.flash('errors', e.errors.map(ele => ele.message));
            res.redirect('/');
            //res.status(500).send(e.toString());
        }
    }

});

router.get('/newtipo', async (req, res)=>{
    try {
        res.render('tipo/newtipo', {
            showBackBotton : true,
            user : req.session.user
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }
});


module.exports = router;