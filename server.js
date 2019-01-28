const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', hbs);
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (msg)=>{
    return msg.toUpperCase();
});

app.use((req, res, next)=>{ //log middleware
    const log = `${new Date()}: ${req.method} ${req.url} \n`;
    console.log(log);
    fs.appendFile('server.log', log,(err)=>{
        if(err){
            console.log('ERROR writing to file', err);
        }
    });
    next();
});

app.use(express.static(__dirname+ '/public')); //middleware
app.use((req, res, next)=>{
    res.render('maintainence.hbs');
})

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMsg: 'Welcome to my web server'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About',
    })
});



app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});