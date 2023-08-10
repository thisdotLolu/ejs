const http = require('http');
const fs = require('fs');
const _ = require('lodash');



const server = http.createServer((req,res)=>{
    
    //loadash
    const num = _.random(0,20)
    console.log(num)
    

    

    const greeting = _.once(() =>{
        console.log('hello')
    })

    greeting()
    greeting()

    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html')

    let path = './views/'

    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end()
        default:
            path += '404.html'
            res.statusCode = 404
            break
    }

    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err)
            res.end()
        }else{
            res.end(data)
        }
    })
});


server.listen(5000, 'localhost',()=>{
    console.log('listening for requests on port 3000')
})

