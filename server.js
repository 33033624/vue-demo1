/**
 * Created by super on 16/12/13.
 */
/**
 * Created by super on 16/12/12.
 */
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');


http.createServer(function(req,res){

    var query = url.parse(req.url,true);
    const path = query.pathname;
    console.log(path);
    switch (path){
        case '/getStudent':{
            fs.readFile(__dirname+'/1.json','utf8',function(err,data){
                console.log(data);
                res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
                res.end(data,'utf8')
            });
            break;


        }
        case '/putStudent':{
            fs.readFile(__dirname+'/1.json','utf8',function(err,data){
                console.log(req.body);
                data = JSON.parse(data);
                var str = ""
                req.on('data',function(chunk){
                    str +=chunk;
                })
                req.on('end',function(){
                    console.log((str))
                    data.push(JSON.parse(str));
                    fs.writeFile(__dirname+'/1.json',JSON.stringify(data));
                    res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
                    res.end();
                })
            });
            break;
        }
        case '/deleteStudent':{
            fs.readFile(__dirname+'/1.json','utf8',function(err,data){
                console.log(req.body);
                data = JSON.parse(data);
                var str = ""
                req.on('data',function(chunk){
                    str +=chunk;
                })
                req.on('end',function(){
                    console.log((str))
                    data.forEach(function(item,index){
                        if(JSON.stringify(item) == str){
                            data.splice(index,1);
                            fs.writeFile(__dirname+'/1.json',JSON.stringify(data));
                            res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
                            res.end();
                            return ;
                        }

                    });

                })
            });
            break;

        }
        case '/changeStudent':{
            fs.readFile(__dirname+'/1.json','utf8',function(err,data){
                console.log(req.body);
                data = JSON.parse(data);
                var str = ""
                req.on('data',function(chunk){
                    str +=chunk;
                })
                req.on('end',function(){
                    console.log((str))
                    console.log('changeStudnet====>');
                    str = JSON.parse(str);
                    data.forEach(function(item,index){


                        console.log('item');
                        if(item.name ==str.name ){
                            console.log('1111')
                            data.splice(index,1,str);
                            fs.writeFile(__dirname+'/1.json',JSON.stringify(data));
                            res.writeHead(200,{"Content-Type":"text/json","Access-Control-Allow-Origin":"*"});
                            res.end();
                            return ;
                        }

                    });

                })
            });
            break;

        }
    }



}).listen(9000) ;

