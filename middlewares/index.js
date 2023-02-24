const session = require('express-session');
const methodOverride = require('method-override');
const MAX_AGE = process.env.MAX_AGE || 60*60*1000;
const SECRET = process.env.SECRET || 'Our beautiful';
const  DEFAULT_ENV = process.env.DEFAULT_ENV || 'development';

const redirectHome = (req, res, next)=>{
    if(req.session.user && !req.path === '/auth/logout'){
        res.redirect('/');
    }else{
        next();
    }
}

const redirectLogin = (req, res, next)=>{
    if(!req.session.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
}

const setSession = ()=>{ 
    return session({
    cookie: {
        maxAge:MAX_AGE,
        secure:DEFAULT_ENV === 'production'
    },
      secret:SECRET,
      resave: false,
      saveUninitialized:false,
  
  })};

const overrideMethods = ()=>{
    return methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          var method = req.body._method
          delete req.body._method
          return method
        }
      })
}



module.exports = {
    redirectHome,
    redirectLogin,
    setSession,
    overrideMethods
}