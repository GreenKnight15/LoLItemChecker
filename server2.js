var express        =         require("express");
var app            =         express();
var request        =         require('request');
var bodyParser = require('body-parser')
var urlapi = require('url');
var http = require('http');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.use(express.static(process.env.OPENSHIFT_NODEJS_REPO_DIR+ '/public'));

app.get('/',function(req,res){
  res.sendfile("index.html");
    
  
});

app.get('/items',function(req,res){
  res.sendfile("items.html");
console.log("get item partial");
  
});
app.get('/stats/*',function(req,res){
  res.sendfile("champ.html");
 
  
});
app.get('/champController.js',function(req,res){
  res.sendfile("champController.js");
  res.setHeader("Content-Type", "text/javascript");
});

var key = "c809083c-8b8a-47e0-a14f-b32be1024db0";

app.post('/allchamps',function(req,res){
    //use api with data from /champ
request("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData="+ req.body.msg +"&api_key="+key,
        function(error,response,body){
        console.log("making request for all champs");
        if (!error ){
            console.log('getting all champs');
            res.send(body);
        } else {
            console.log(error);
        }
    });
});


//get post data from /champ
app.post('/stats',function(req,res){
    //use api with data from /champ
    var champId= req.body.msg.pop();
    console.log(champId);
    //var champId = req.body.msg.substr(req.body.msg.lastIndexOf('/') + 1);
    
    request("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/"+champId+"?champData=all&api_key="+key,
        function(error,response, body){
    
        
        console.log("making request for single champ");
        if (!error ){
            res.send(body);
        } else {
            console.log(error);
        }
    });
});

//get post data from /allitems
app.post('/allitems',function(req,res){
    //use api with data from /champ
    console.log();
    
    request("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key="+key,
        function(error,response, body){
            console.log("making request for all items");
        if (!error ){
            res.send(body);
        } else {
            console.log(error);
        }
    });
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || '8080');
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');


app.listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port '  + app.get('ip')+ app.get('port'));
});