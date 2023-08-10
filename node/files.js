const fs = require('fs');

//reading files
fs.readFile('./docs/blog1.txt', (err, data)=>{
    if(err){
        console.log(err)
    }
    console.log('last line')
})

console.log('last line')

//write files
fs.writeFile('./docs/blog1.txt','hello world', (err, data)=>{
    console.log('file was written')
})

//directories
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', ()=>{
        console.log('folder created')
    })
}
else{
    fs.rmdir('./assets',(err)=>{
        if(err){
            console.log('error')
        }
        console.log('folder deleted')
    })
}

//deleting files 
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt',(err)=>{
        if(err){
            console.log(err)
        }
        console.log('file deleted');
    })
}

