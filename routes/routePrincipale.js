const express = require('express');
const router = express.Router();
const principale = require('../controllers/controllerPrincipale');

router.get('/', async (req, res) =>{
    //res.send('principale');
    //res.json(getUser());
    try {
        const result = await(principale.getUser());
        res.render('index', {utenti : result, tipo : 'TUTTI'});
    } catch (e) {
        res.status(500).send(e.toString());
    }
    
});

module.exports = router;