const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { resolveObjectURL } = require('buffer')

const app=express();
//define path for express config
const pat=path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set up handlebars engine and view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//sending static  directory  to  server
app.use(express.static(pat))

app.get("",(req,res)=>{
    res.render('index',{
       title:'Weather',
        name:'Yubahwe Chris'

    });
})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:'about',
        name:'Yubahwe Chris'
    });
})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'any help',
        name:'Yubahwe Chris',
        helpText: 'This is some helpful text.'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'address must be  provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
     if(error){
        return res.send({error})
     }
     forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
           return res.send({error})
        }
    res.send({
         forecast: forecastData,
         location,
         address:req.query.address

        }) 
     })
   })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
    }
   console.log(req.query.search)
   res.send({
       products:[]
   })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Yubahwe Chris',
        errorMessage:"help article not found"
    })
})
app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Yubahwe Chris',
    errorMessage:"page not found"
  })
})
app.listen(3000,()=>{
    
    console.log('app server run on 3000')}
);