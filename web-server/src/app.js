const path = require('path')
const express = require('express')
const hbs =  require('hbs')

const app=express();
//define path for express config
const pat=path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'..templates/partials');

//set up handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartial(partialsPath);

//sending static  directory  to  server
app.use(express.static(pat))

app.get('',(req,res)=>{
    res.render('index',{
       title:'Weather',
        name:'chris rex'

    });
})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:'about me,',
        name:'chris  rex'
    })
})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'any help,',
        name:'chris  rex'
          
    })
})

app.get('/weather',(req,res)=>{
    res.send({
       forecast:'it is snow',
       location:'kigali'
          
    })
})
app.get('help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'chris rex',
        errorMessage:"help article not found"
    })
})
app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'chris rex',
    errorMessage:"page not found"
})
})
app.listen(3000,()=>{
    
    console.log('app server run on 3000')}
);