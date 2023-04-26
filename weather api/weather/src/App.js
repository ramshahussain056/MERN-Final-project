
 import logo from './logo.svg';
 import './App.css';
 import { useState } from "react";

 function App() {

   const[search, setSearch] = useState("");
   const[weather, setWeather] = useState({});

   const searchButton = () => {
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=8d83c5a3b95256f46f5f781dfaa264d8`)
     .then((res) => res.json())
     .then((result) =>{
       setWeather(result)
     });
   };
   return (
     <div className="App">

         Weather API
         <div className="weather">
         {/* Search Box */}
         
         <input type="text" placeholder="Country/City" onChange={(e) => setSearch(e.target.value)}></input>
         
         <button onClick={searchButton}>Search</button>
        
         
         </div>

         {typeof weather.main!== "undefined" ? (
       <div>

       
   
       <p>{weather.name}</p>
      
       <p>{weather.main.temp}°C</p>
    
       <p>{weather.weather[0].main}</p>
       
       </div>
       )
       :(
       ""
       )
       }
       
     </div>
   );
 }

 export default App;