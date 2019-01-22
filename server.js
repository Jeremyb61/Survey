var express = require('express');
var app = express();
var session = require('express-session')
const path = require('path');

app.use(session({
    secret: 'kdfjlds',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000 }
}));

  const bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded({extended:true}));

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.get('/', function(req, res){
      res.render('index.ejs');
  });

  app.get('/survey', function(req, res){
      res.render('survey.ejs',{name:req.session.users});
  });

app.post('/process', function(req, res){
    var name = {
        name : req.body.name,
        location : req.body.location,
        language : req.body.lang,
        comment : req.body.comment
      }
      req.session.users = name;
    res.redirect('/survey')
})

  app.listen(8000, function(){
    console.log("listening on 8000");
});