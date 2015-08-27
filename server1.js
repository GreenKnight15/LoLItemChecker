#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

   
/*
 * 
 * var key = "c809083c-8b8a-47e0-a14f-b32be1024db0";
    self.post('/allchamps',function(req,res){
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
    self.post('/stats',function(req,res){
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
    self.post('/allitems',function(req,res){
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
    */
    
    /**
     *  Create the routing table entries + handlers for the application.
     *
	 */
    
	

    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
        
        self.routes['/items']=function(req,res){
        	  res.sendfile("items.html");
        	console.log("get item partial");
        	};
        	
        self.routes['/stats/*']=function(req,res){
        	  res.sendfile("champ.html");
        	};
        	
        self.routes['/champController.js']=function(req,res){
        	 res.sendfile("champController.js");
        	};
        	
        	var key = "c809083c-8b8a-47e0-a14f-b32be1024db0";
        	
        	self.routes['/allchamps']=function(req,res){
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
            };
            /*
          //get post data from /champ
            self.routes['/stats']=function(req,res){
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
            };
            
          //get post data from /allitems
            self.routes['/allitems']=function(req,res){
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
            };
            */
            
    };
    
  
    self.app = express;

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
  
        self.app.createServer();
        
        self.app.post('/allchamps', self.routes['allchamps']);

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();
