$(document).ready(function() {
    var lat,long;
  
  //Making a title case for weatherType.
  function titleCase(str) {
  var convertToArray = str.toLowerCase().split(" ");
  var result = convertToArray.map(function(val){
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
  });
  return result.join(" ");
}
      
  //Getting location data! Had to use ip-api because geolocation data doesn't work in codepen or none https links!
 $.getJSON('http://ip-api.com/json', function(ldata) {
		lat = ldata.lat;
		long = ldata.lon;

    //Checking location data!
    // $("#data").html("latitude: " + lat + "<br>longitude: " + long);
    
    //Create api!
   var api = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
			lat + '&lon=' + long + 
		  '&appid=8ae95a0698ced7693a3427c0a9ac10cd';
    
    //Getting weather data!
    $.getJSON(api, function(wdata) {

       var country,city,weather,windSpeed,weatherType,tempKel,tempCel,tempFah; 
      
      country = wdata.sys.country;
      city = wdata.name;
      //weather = wdata.weather[0].main;
      windSpeed = wdata.wind.speed;
      weatherType = wdata.weather[0].description;
      tempKel = wdata.main.temp;
      var tempSwap = true; // temp var for swapping temp values
      tempFah = Math.round((tempKel) * (9 / 5) - 459.67);
      tempCel = Math.round((tempKel) - 273);
       $('.city').html(city);
      
       $('.country').html(country);  
                
       $('.temp').html(tempFah + ' &deg;F');
           
       $('.windSpeed').html(windSpeed + ' m/s');
       $('.weatherType').html(titleCase(weatherType));
      
  $('.temp').click(function(){
     if(tempSwap === false) {
        $('.temp').html(tempCel + ' &deg;C');
        tempSwap = true;
     } else{ 
        $('.temp').html(tempFah + ' &deg;F');
        tempSwap = false;
      }
   
      });    
    });
 });
});