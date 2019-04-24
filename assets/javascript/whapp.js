//********************************************************************
//  function SelectCity() - Event handler for dropdown menu selection
//  The purpose of this function is to determine which city was selected
//  from the dropdown menu, set the CurrentCity global variable and 
//  display the current weather widget for the selected city
//********************************************************************
function SelectCity(inputCity) {
    if (DebugOn) console.log("In SelectCity " + inputCity);
    CurrentCity = inputCity;

//     DisplayWeather (CurrentCity);
}  // function SelectCity()

//********************************************************************
//  function getFood(Category) - Event handler for dropdown menu selection
//  The purpose of this function is to do an API Ajax Query for the input
//  Category for the global variable CurrentCity.  Once the data comes back the 
//  appropriate data is parsed from the JSON and entered into the FoodArray.
//  
//********************************************************************
function getFood(Category) {

 if (DebugOn) console.log ("In getFood: " + CurrentCity + "," + Category);

 // Assign the Zomamto CuisineID based on the input Category
 var CuisineID = "1";  // default to American
 switch (Category) {
   case "American" : 
     CuisineID = "1";
     break;
   case "Asian" : 
     CuisineID = "3";
     break;
   case "BBQ" : 
     CuisineID = "193";
     break;
   case "Italian" : 
     CuisineID = "55";
     break;
   case "Mexican" : 
     CuisineID = "73";
     break;
   default :
 }  // switch (Category)

 // Assign the Zomamto CityID based on the global CurrentCity
 var CityID = "276";  // default to Dallas
 switch (CurrentCity) {
   case "Dallas" :
     CityID = "276"
     break;     
   case "Houston" : 
      CityID = "277";
      break;
   case "New York" : 
      CityID = "280";
      break;
   case "Chicago" : 
      CityID = "292";
      break;
   case "Los Angeles": 
      CityID = "281";
      break;
 } // switch (CurrentCity)

 var ZomatoAPIKey = "8361db6e811b9639f3fbd799b81695b0";   // Zomato API key

 // Build the URL needed to query the database
 var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
                "city_id=" + CityID + "&count=" + FoodLimit + 
                "&cuisines=" + CuisineID + "&category=2&sort=rating&order=desc";
                      
 // ajax Query with the cityName and Category
 $.ajax({  
     url: queryURL,
     dataType: 'json',
     async: true,
     beforeSend: function(xhr){
       xhr.setRequestHeader('user-key', ZomatoAPIKey); // Insert the api key into the HTTP header        
     },  // ajax response
     success: function(response) { // after response from query
         var numResults = response.results_shown;
         var FoodArray = [];  // create pointer to empty FoodArray
 
         // One by one fill the FoodArray with the response data 
         for (i = 0; i < numResults; i++) {

             // create object of Food
             var Food = new Object();

             // Get the needed data from the Zomato response
             Food.Name = response.restaurants[i].restaurant.name;
             Food.Addr = response.restaurants[i].restaurant.location.address;
             Food.Phone = "NA";
             Food.Rate = response.restaurants[i].restaurant.user_rating.aggregate_rating;
             Food.Website = response.restaurants[i].restaurant.url;

             // push the Food object into the FoodArray 
             FoodArray.push(Food);
         }  // for 
         console.log ("FoodArray: ", FoodArray);
         console.log(response);

         // Display the data on Food Page
         UpdateResultDisplay(FoodArray, CurrentCity, Category);
      }   //ajax response
 });  // .ajax() function call

}  // function getFood (Category)

//********************************************************************
//  function UpdateResultDisplay (inputArray)
//  The purpose of this function is display the contents of the inputArray
//  on the Food Page
//********************************************************************
function UpdateResultDisplay (inputArray, City, Category) {
   if (DebugOn) console.log ("In UpdateResultDisplay(): ", inputArray);

   $("#CityCategory").text("Results for City: " + City + "  Category: " + Category);
   
   if (DebugOn) {
       for (var i = 0; i < inputArray.length; i++)  {
           console.log ("Food Name: " + inputArray[i].Name);
           console.log ("Food Location: " + inputArray[i].Addr);
           console.log ("Food Phone: " + inputArray[i].Phone);
           console.log ("Food Rate: " + inputArray[i].Rate);
           console.log ("Food Website: " + inputArray[i].Website);
       }  // for
   }  // if DebugOn

   // list the results in table format
   for (var i = 0; i < inputArray.length; i++)  {
     // Populate the new row of display data
     var newRow = $("<tr>");

     //  name
     var resultDiv = $("<td>");
     resultDiv.text(inputArray[i].Name);
     newRow.append(resultDiv);

     // addr
     var resultDiv = $("<td>");
     resultDiv.text(inputArray[i].Addr);
     newRow.append(resultDiv);

     // phone
     var resultDiv = $("<td>");
     resultDiv.text(inputArray[i].Phone);
     newRow.append(resultDiv);

     // rating
     var resultDiv = $("<td>");
     resultDiv.text(inputArray[i].Rate);
     newRow.append(resultDiv);

     // website url 
     var resultDiv = $("<td>");
     resultDiv.text(inputArray[i].Website);
     newRow.append(resultDiv);

     // Display the new row
     $("#result-table").append(newRow);
     if (DebugOn) console.log ("appended new row " + i);
     if (DebugOn) console.log ("appended new row ", newRow);

   }  // for

}  // UpdateResultDisplay (inputArray, City, Category)


//********************************************************************
//  function getNight(Category) - Event handler for dropdown menu selection
//  The purpose of this function is to do an API Ajax Query for the input
//  Category for the global variable CurrentCity.  Once the data comes back the 
//  appropriate data is parsed from the JSON and entered into the NightArray.
//  
//********************************************************************
function getNight(Category) {

if (DebugOn) console.log ("In getNight: " + CurrentCity + "," + Category);

// Assign the Zomamto CityID based on the global CurrentCity
var CityID = "276";  // default to Dallas
switch (CurrentCity) {
 case "Dallas" :
   CityID = "276"
   break;     
 case "Houston" : 
    CityID = "277";
    break;
 case "New York" : 
    CityID = "280";
    break;
 case "Chicago" : 
    CityID = "292";
    break;
 case "Los Angeles": 
    CityID = "281";
    break;
} // switch (CurrentCity)

var CuisineID = "1";      // default to American
var CollectionID = "55";  // default to Live Music
var CategoryID = "11";    // default to Clubs & Lounges

// Assign the Zomamto ID tags and urlQuery based on the input Category
switch (Category) {
 case "Sports Bars" : 
   CollectionID = "15";
   var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + CityID + "&count=" + NightLimit + 
              "&collection=" + CollectionID + "&sort=rating&order=desc";
   break;
 case "Craft Beer" : 
   CollectionID = "41";
   var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + CityID + "&count=" + NightLimit + 
              "&collection=" + CollectionID + "&sort=rating&order=desc";
   break;
 case "Live Music" : 
   CollectionID = "55";
   var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + CityID + "&count=" + NightLimit + 
              "&collection=" + CollectionID + "&sort=rating&order=desc";
   break;
   case "Clubs & Lounges" : 
   CategoryID = "14";
   EstablishmentID = "8"
   var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + CityID + "&count=" + NightLimit + 
              "&establishment_type=" + EstablishmentID +
              "&category=" + CategoryID + "&sort=rating&order=desc";
   break;
   case "Wine Bar" : 
   EstablishmentID = "278"
   var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + CityID + "&count=" + NightLimit + 
              "&establishment_type=" + EstablishmentID +
              "&sort=rating&order=desc";
   break;
 default :
   CollectionID = "73";
   break;
}  // switch (Category)


var ZomatoAPIKey = "8361db6e811b9639f3fbd799b81695b0";   // Zomato API key

// Build the URL needed to query the database
var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + CityID + "&count=" + FoodLimit + 
              "&cuisines=" + CuisineID + "&category=2&sort=rating&order=desc";
                    
// ajax Query with the cityName and Category
$.ajax({  
   url: queryURL,
   dataType: 'json',
   async: true,
   beforeSend: function(xhr){
     xhr.setRequestHeader('user-key', ZomatoAPIKey); // Insert the api key into the HTTP header        
   },  // ajax response
   success: function(response) { // after response from query
       var numResults = response.results_shown;
       var NightArray = [];  // create pointer to empty FoodArray

       // One by one fill the NightArray with the response data 
       for (i = 0; i < numResults; i++) {

           // create object of Night
           var Night = new Object();

           // Get the needed data from the Zomato response
           Night.Name = response.restaurants[i].restaurant.name;
           Night.Addr = response.restaurants[i].restaurant.location.address;
           Night.Phone = "NA";
           Night.Rate = response.restaurants[i].restaurant.user_rating.aggregate_rating;
           Night.Website = response.restaurants[i].restaurant.url;

           // push the Night object into the NightArray 
           NightArray.push(Night);
       }  // for 
       console.log ("NightArray:", NightArray);
       console.log(response);

       // Display the data on Night Page
       UpdateResultDisplay(NightArray, CurrentCity, Category);
    }   //ajax response
 });  // .ajax() function call
}  // function getNight (Category)

//********************************************************************
//  function DisplayWeather() - 
//  The purpose of this function is to display the current weather
//  widget for the CurrentCity global variable
//********************************************************************
function DisplayWeather() {

   var WeatherWidgetDiv = $("<div>");
   // create a pointer of type <img> 
   var WeatherImage1 = $("<img>");
   var WeatherImage2 = $("<img>");
   var WeatherImage3 = $("<img>");
   var WeatherImage4 = $("<img>");
   switch (CurrentCity) {
     case "Dallas"  :    
         WeatherImage1.attr("src", "https://w.bookcdn.com/weather/picture/1_26868_0_1_137AE9_200_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=58942" );
         WeatherImage2.attr("src", "https://w.bookcdn.com/weather/picture/3_26868_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=94032" );
         WeatherImage3.attr("src", "https://w.bookcdn.com/weather/picture/4_26868_0_1_1776eb_160_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=93357" );
         WeatherImage4.attr("src", "https://w.bookcdn.com/weather/picture/32_26868_0_1_3658db_250_2a48ba_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=2&domid=w209&anc_id=57234" );
         break;
     case "New York" :
         WeatherImage1.attr("src", "https://w.bookcdn.com/weather/picture/1_18103_0_1_137AE9_200_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=58942" );
         WeatherImage2.attr("src", "https://w.bookcdn.com/weather/picture/3_18103_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=94032" );
         WeatherImage3.attr("src", "https://w.bookcdn.com/weather/picture/4_18103_0_1_1776eb_160_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=93357" );
         WeatherImage4.attr("src", "https://w.bookcdn.com/weather/picture/32_18103_1_1_3658db_250_2a48ba_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=2&domid=w209&anc_id=12827" );
         break;
     case "Chicago" :
         WeatherImage1.attr("src", "https://w.bookcdn.com/weather/picture/1_18041_0_1_137AE9_200_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=58942" );
         WeatherImage2.attr("src", "https://w.bookcdn.com/weather/picture/3_18041_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=94032" );
         WeatherImage3.attr("src", "https://w.bookcdn.com/weather/picture/4_18041_0_1_1776eb_160_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=93357" );
         WeatherImage4.attr("src", "https://w.bookcdn.com/weather/picture/32_18041_1_1_3658db_250_2a48ba_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=2&domid=w209&anc_id=12827" );
     break;
     case "Los Angeles" :
         WeatherImage1.attr("src", "https://w.bookcdn.com/weather/picture/1_18353_0_1_137AE9_200_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=58942" );
         WeatherImage2.attr("src", "https://w.bookcdn.com/weather/picture/3_18353_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=94032" );
         WeatherImage3.attr("src", "https://w.bookcdn.com/weather/picture/4_18353_0_1_1776eb_160_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=93357" );
         WeatherImage4.attr("src", "https://w.bookcdn.com/weather/picture/32_18353_1_1_3658db_250_2a48ba_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=2&domid=w209&anc_id=12827" );
     break;
     case "Houston" :
         WeatherImage1.attr("src", "https://w.bookcdn.com/weather/picture/1_630_0_1_137AE9_200_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=58942" );
         WeatherImage2.attr("src", "https://w.bookcdn.com/weather/picture/3_630_0_1_137AE9_250_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=94032" );
         WeatherImage3.attr("src", "https://w.bookcdn.com/weather/picture/4_630_0_1_1776eb_160_ffffff_333333_08488D_1_ffffff_333333_0_6.png?scode=2&domid=w209&anc_id=93357" );
         WeatherImage4.attr("src", "https://w.bookcdn.com/weather/picture/32_630_1_1_3658db_250_2a48ba_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=2&domid=w209&anc_id=12827" );
     break;
   } // switch()

   WeatherWidgetDiv.append(WeatherImage1);
   WeatherWidgetDiv.append(WeatherImage2);
   WeatherWidgetDiv.append(WeatherImage3);
   WeatherWidgetDiv.append(WeatherImage4);
     
   // prepend the gif <div> pointer to the screen
   $("#WeatherWidgetHere").prepend(WeatherWidgetDiv);
}  // function DisplayWeather()

//********************************************************************
//  function getYelp(Category) - 
//  
//********************************************************************
function getThings(Category) {

if (DebugOn) console.log ("In getYelp: " + CurrentCity + "," + Category);


var YelpAPIKey = "2OmLWmtreHVEweRgkciRyyxorN-DnYkyTD4bmsrycQHjbI2XxTZAm8DKGZLwwvbVbuGIkUR1-Af8Olwv3WHEBdN396aBLUZBSEs69f62GUCBgDeJ9L5h9CAf6WG-XHYx";   // Yelp API key

// Build the URL needed to query the database


var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/" +
              "businesses/search?location="+CurrentCity+"&limit=10&term="+Category +
              "&sort_by=rating&order=desc";

$.ajax({
       url: queryURL,
       method: "GET",
       headers: {
           "accept": "application/json",
           "x-requested-with": "xmlhttprequest",
           "Access-Control-Allow-Origin":"*",
           "Authorization": `Bearer ${YelpAPIKey}`
       }
   }).then(function(response) {
       var NightArray = [];  // create pointer to empty FoodArray

       // One by one fill the FoodArray with the response data 
       for (i = 0; i < NightLimit; i++) {

           // create object of Food
           var Night = new Object();

           // Get the needed data from the Yelp response
           Night.Name = response.businesses[i].name;
           Night.Addr = response.businesses[i].location.display_address;
           Night.Phone = response.businesses[i].phone;
           Night.Rate = response.businesses[i].rating;
           Night.Website = response.businesses[i].url;

           // push the Night object into the NightArray 
           NightArray.push(Night);
       }  // for 
       console.log ("NightArray:", NightArray);
       console.log(response);

       // Display the data on Night Page
       UpdateResultDisplay(NightArray, CurrentCity, Category);

       console.log(businesses);
   });  // ajax function call
}  // function getYelp (Category)

