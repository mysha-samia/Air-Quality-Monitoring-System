const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;
const fullpath = __dirname + '/public';
const routes = require('./server/routes/webRoutes');


require('dotenv').config();
require('./server/controllers/mysql');

app.use(express.static(fullpath));
app.use(expressLayouts);

// app.set('views', './components');
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', routes);


app.listen(port, ()=> console.log('Listening to port '+ port));