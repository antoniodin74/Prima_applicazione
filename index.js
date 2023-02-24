const express = require('express');
const app = express();

const flash = require('connect-flash');
const {redirectHome,redirectLogin, setSession, overrideMethods} = require('./middlewares');



app.use(express.urlencoded({extended: true}));
app.use(express.json());
// configura sessione
app.use(setSession());
app.use(overrideMethods());
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use('/axios',express.static(__dirname + '/node_modules/axios/dist'));
app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/sweetalert2',express.static(__dirname + '/node_modules/sweetalert2/dist'));
app.use(express.static(__dirname + '/public'));

//HANDLEBARS
const expHbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const handlebars = expHbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');



const principaleRoutes = require('./routes/api/routePrincipale');
const tipoRoutes = require('./routes/api/routeTipo');
const autRoutes = require('./routes/auth');

app.use('/auth', redirectHome, autRoutes);
app.use('/api/tipo', redirectLogin, tipoRoutes);
app.use('/api/principale', redirectLogin, principaleRoutes);
app.use('/principale', redirectLogin, require('./routes/routePrincipale'));
app.use(['/tipo', '/'], redirectLogin, require('./routes/routeTipo'));

//app.use('/tipo', tipoRoutes);
//app.use('/principale', principaleRoutes);

//RENDER PRIMA PAGINA .HBS
/*app.get('/',(req,res) =>{
    res.render('index');
});*/

app.listen(4001, ()=> console.log('in ascolto su porta 4001'));