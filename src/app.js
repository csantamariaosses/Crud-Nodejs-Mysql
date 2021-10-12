const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const customerRoutes = require('./routes/customers');

// Settingd
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// midleware
app.use(morgan('dev'));

app.use(myConnection( mysql, 
    {
        host:'localhost',
        user:'csanta',
        password:'$Password2021',
        port:'3306',
        database:'crud_node_mysql'
    },'single'));

app.use( express.urlencoded( {extended : true } ));


// Rutas
app.use('/', customerRoutes);


// statics files
app.use( express.static( path.join(__dirname, 'public')));




app.listen( app.get('port'), () => {
    console.log('Server on port 3000');
})