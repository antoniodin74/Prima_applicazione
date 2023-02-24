const express = require('express');
const router = express.Router();
const auth = require('../controllers/controllerAuth');

router.get('/signup', async (req, res)=>{
        res.render('login', {
            signup : true
        });
});

router.post('/register', async (req, res)=>{
    try{
            const {id,name,email} = await auth.addUser(req.body);
            const User = {id,name,email};
            req.session.user = User;
            res.status(id? 200: 404).json(id? User : null);
    } catch (e) {
            res.status(500).send({message:e.toString()});
    }
})

router.get('/login', async (req, res)=>{
        res.render('login', {
            signup : false
        });
});

router.post('/login', async (req, res)=>{
        try{
                const {nome,email,id} = await auth.login(req.body);
                const User = {nome,email,id};
                req.session.user = User;
                res.status(id? 200: 404).json(id? User : null);
        } catch (e) {
                res.status(500).send({message:e.toString()});
        }
});


router.get('/logout', async (req, res)=>{
        req.session.destroy((e) =>{
         res.redirect('/auth/login');
        });
         
 });



module.exports = router;