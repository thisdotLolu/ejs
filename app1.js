const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Blog = require('./models/blog')

//CONNECT TO MONGODB
const dbURI = 'mongodb+srv://davidebe63:Temiloluwa18@cluster0.cefiy56.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=>app.listen(5000))
.catch((err)=>console.log(err))



//register viw engine
app.set('view engine', 'ejs')

app.use((req,res,next)=>{
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method)
    next()
})



app.get('/add-blog', (req,res)=>{
    //like create a blog
    const blog = new Blog({
        title: 'extra blog',
        snippet: 'about my extra blog',
        body: 'more about my new blog'
    })

    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/all-blogs', (req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/single-blog', (req,res)=>{
    Blog.findById('64d3413317988948aaa04e07')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})




app.get('/', (req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index',{blogs})
})


app.get('/about', (req,res)=>{
    // res.send('<p>about page</p>');
    res.render('about', {title:"about"})
})

app.get('/blogs/create', (req,res)=>{
    res.render('create',{title:"create"})
})
//redirects
app.get('/about-us', (req,res)=>{
    res.redirect('/about',{title:"a"})
})

app.use((req,res)=>{
    res.status(404).render('404',{title:"404"})
})