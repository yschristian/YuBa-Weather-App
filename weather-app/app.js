const request = require('request')
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const address = process.argv[2]

if(!address){
 console.log('please provide an address');
}else{
  geocode(address,(error,{latitude,longitude,location})=>{
    if(error){
      return console.log(error);
    }
    forecast(latitude,longitude,(error,forecastData)=>{
       if(error){
        return console.log(error);
       }else{ 
        console.log(location);
        console.log(forecastData);
       }
      })
  })

}


