'use strict';

const Keycloak = require('keycloak-connect');
const express = require('express');
const session = require('express-session');
const expressHbs = require('express-handlebars');

const app = express();

// Register 'handelbars' extension with The Mustache Express
// app.engine('hbs', expressHbs({extname:'hbs',
//   defaultLayout:'layout.hbs',
//   relativeTo: __dirname}));
// app.set('view engine', 'hbs');

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });


//session
app.use(session({
  secret:'thisShouldBeLongAndSecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

//route protected with Keycloak
app.get('/start',(req,res)=>{
  res.send("hello");
})

app.get('/test', keycloak.protect(), (req, res)=>{
    console.log(memoryStore)
    // console.log(login)
    
  res.send({
    title:'Test of the test'
  });
});


// app.get('/logout', (req, res)=>{
//   console.log("im logged out",keycloak.logout());
//   res.send(keycloak);
// });
//unprotected route
// app.get('/',function(req,res){
//   res.render('index');
// });


app.listen(8000, function () {
  console.log('Listening at http://localhost:8000');
});